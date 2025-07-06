import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class VideoService {
  async convertToHLS(filename: string) {
    const inputPath = path.join('uploads', filename);
    const outputDir = path.join('hls', filename.replace(/\.[^/.]+$/, ''));
    fs.mkdirSync(outputDir, { recursive: true });

    const command = `ffmpeg -i "${inputPath}" -profile:v baseline -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputDir}/index.m3u8"`;
    await execAsync(command);
  }

  listHLS() {
    const baseDir = path.join(process.cwd(), 'hls');
    const folders = fs.readdirSync(baseDir).filter(name =>
      fs.existsSync(path.join(baseDir, name, 'index.m3u8'))
    );

    return folders.map(name => ({
      name,
      url: `/videos/stream/${name}/index.m3u8`,
    }));
  }
}
