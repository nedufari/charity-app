import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'
import multer from 'multer';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.use(cors({
    origin:"*"
  }))
  app.enableCors({origin:["*"]})
  
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe)
  //  // Set up multer middleware with default options
  //  app.use(multer().single('photo'));
  await app.listen(3000);
}
bootstrap();
