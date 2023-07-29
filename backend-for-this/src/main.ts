import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

let _ENV: any = dotenv.config().parsed;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  if (_ENV['NODE_ENV'] === 'development') app.use(morgan('dev'));

  app.use(cookieParser());
  /**
   * parse json data
   */
  app.use(express.json({ limit: '50mb' }));
  /**
   * parse form data
   */
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (ValidationErrors: ValidationError[] = []) => {
        console.log(ValidationErrors);
        return new BadRequestException(ValidationErrors);
      },
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  );

  await app.listen(_ENV['PORT'], () => {
    console.log(`Server is running at http://localhost:${_ENV['PORT']}`);
  });
}
bootstrap();
