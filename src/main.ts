import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(5000);
}
bootstrap();
