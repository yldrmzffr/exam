import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './bootstrap/common/filters/exception.filter';
import * as process from 'process';

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(Logger)));
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Exam API')
    .setDescription('The exams and placement API')
    .setVersion(process.env.VERSION || '0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap().then(() =>
  console.debug(`🚀 Server started at http://localhost:${PORT}`),
);
