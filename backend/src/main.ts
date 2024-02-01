import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Investr')
    .setDescription('Investr api documentation')
    .setVersion('1.0')
    .addTag('products')
    .addTag('users')
    .addTag('auth')
    .addTag('tags')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(8088);
}
bootstrap();
