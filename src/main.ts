import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExcludeNullPointerInterceptor } from './utils/interceptors/excludeNullPointer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // to add interceptor globally
  // TODO uncomment the NullPointerInterceptor later, it is annoying during api testing
  // app.useGlobalInterceptors(new ExcludeNullPointerInterceptor());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('Items example')
    .setDescription('The items API description')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
