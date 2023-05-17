import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UniversityApiResponse } from './university.http-client.types';
import * as process from 'process';

@Injectable()
export class UniversityHttpClientService {
  BASE_URL: string;
  constructor(private readonly httpService: HttpService) {
    this.BASE_URL = process.env.UNIVERSITY_API_URL;
  }
  async getUniversitiesFromApi(): Promise<UniversityApiResponse[]> {
    const url = `${this.BASE_URL}/search?country=Turkey`;
    const response = await this.httpService.axiosRef.get(url);

    const data: UniversityApiResponse[] = response.data;

    // TODO: Logic move to a helper function

    const sortedUniversities = data.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    return sortedUniversities.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i,
    );
  }
}
