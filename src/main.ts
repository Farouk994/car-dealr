import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // This property is to make sure that incoming requests dont have extraneous 
      // properties in the body we dont expect
      // Any addition properties will be stripped upon response
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
