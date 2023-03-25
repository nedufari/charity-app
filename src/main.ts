import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors({
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],
    origin:["*"]
  
  });
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
