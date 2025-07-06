import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'hls'), // bu static fayllar uchun
      serveRoot: '/videos/stream',           // bu URL prefix bo‘ladi
    }),
    VideoModule, // video.controller.ts va video.service.ts shu yerda
  ],
})
export class AppModule {}
