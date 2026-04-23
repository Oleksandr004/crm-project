import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Lead Tracker API')
    .setDescription('Documentation for the mini-CRM lead management system')
    .setVersion('1.0')
    .addTag('leads', 'Lead Management')
    .addTag('comments', 'Working with comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://frontend:3000',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 5000);
  console.log('Server started on Port:', process.env.PORT ?? 5000);
}
bootstrap();
