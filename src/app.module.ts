import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './bootstrap/common/interceptors/transform.interceptor';
import { ValidationPipeConfig } from 'src/bootstrap/common/config/validation-pipe.config';
import { UniversitiesModule } from './universities/universities.module';
import { ExamsModule } from './exams/exams.module';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './bootstrap/health/health.module';
import { HttpClientModule } from './bootstrap/http-client/http-client.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGO_URL,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'debug',
      },
    }),
    HealthModule,
    HttpClientModule,
    StudentsModule,
    UniversitiesModule,
    ExamsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe(ValidationPipeConfig),
    },
  ],
})
export class AppModule {}
