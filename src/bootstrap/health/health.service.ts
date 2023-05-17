import { Injectable } from '@nestjs/common';
import { LogMe } from '../common/decorators/log.decorator';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class HealthService {
  constructor(private readonly logger: PinoLogger) {}
  @LogMe()
  healthCheck(): {
    status: string;
    message: string;
    date: Date;
  } {
    return {
      status: 'ok',
      message: 'I am alive!',
      date: new Date(),
    };
  }
}
