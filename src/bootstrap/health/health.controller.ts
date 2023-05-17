import { Controller, Get, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class HealthController {
  constructor(private readonly HealthService: HealthService) {}

  @Get()
  @ApiExcludeEndpoint()
  redirectSwagger(@Res() res) {
    res.redirect('/api');
  }
  @Get('/health')
  getHello(): {
    status: string;
    message: string;
    date: Date;
  } {
    return this.HealthService.healthCheck();
  }
}
