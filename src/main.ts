import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'
import * as express from 'express';
import { join } from 'path';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.use(cors({
    origin:"*"
  }))
  app.enableCors({origin:["*"]})
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  
  
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe)
  //  // Set up multer middleware with default options
  //  app.use(multer().single('photo'));
  await app.listen(3000);
}
bootstrap();
