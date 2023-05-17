import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { StudentApiResponse } from './student.http-client.types';
import * as process from 'process';

@Injectable()
export class StudentHttpClientService {
  BASE_URL: string;
  constructor(private readonly httpService: HttpService) {
    this.BASE_URL = process.env.STUDENT_API_URL;
  }
  async getStudentsFromApi(count: number): Promise<StudentApiResponse> {
    const url = `${this.BASE_URL}/api/?results=${count}`;
    const response = await this.httpService.axiosRef.get(url);

    return response.data;
  }
}
