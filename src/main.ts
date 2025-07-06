import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use('/videos/stream', express.static(path.join(__dirname, '..', 'hls')));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
