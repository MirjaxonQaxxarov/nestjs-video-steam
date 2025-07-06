import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    // 1. HTML frontend uchun
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/videos*'],
    }),

    // 2. HLS video fayllar uchun
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'hls'),
      serveRoot: '/videos/stream',
    }),

    VideoModule,
  ],
})
export class AppModule {}
