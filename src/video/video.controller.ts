import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoService } from './video.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {

  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    await this.videoService.convertToHLS(file.filename);
    return { message: 'Uploaded and processed', filename: file.filename };
  }

  @Get('list')
  getList() {
    return this.videoService.listHLS();
  }

  @Get('stream/:filename')
  stream(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'hls', filename);
    res.sendFile(filePath);
  }


  @Get('list-mp4')
  listMp4(): { name: string; url: string }[] {
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      throw new NotFoundException('Upload papkasi topilmadi.');
    }
    const files = fs.readdirSync(uploadPath);
    if (files.length === 0) {
      return [];
    }
    return files
      .filter(f => f.endsWith('.mp4'))
      .map(name => ({
        name,
        url: `/videos/mp4/${name}`,
      }));
  }
  @Get('mp4/:filename')
  streamMp4(@Param('filename') filename: string, @Res() res: Response, @Req() req: Request) {
    const uploadPath = path.join(process.cwd(), 'uploads');
    const videoPath = path.join(uploadPath, filename);

    if (!fs.existsSync(videoPath)) {
      throw new NotFoundException('Video topilmadi.');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const headers = req.headers as { range?: string };
    const range = headers.range ?? null;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });

      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  }
}
