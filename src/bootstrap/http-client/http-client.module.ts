import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StudentHttpClientService } from './student.http-client/student.http-client.service';
import { UniversityHttpClientService } from './university.http-client/university.http-client.service';
import { WikiHttpClientService } from './wiki.http-client/wiki.http-client.service';

@Module({
  imports: [HttpModule],
  providers: [
    StudentHttpClientService,
    UniversityHttpClientService,
    WikiHttpClientService,
  ],
  exports: [
    StudentHttpClientService,
    UniversityHttpClientService,
    WikiHttpClientService,
  ],
})
export class HttpClientModule {}
