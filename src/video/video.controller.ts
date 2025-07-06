import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoService } from './video.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

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
}
