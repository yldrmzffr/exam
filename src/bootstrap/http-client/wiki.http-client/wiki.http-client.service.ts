import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class WikiHttpClientService {
  BASE_URL: string;
  constructor(private readonly httpService: HttpService) {
    this.BASE_URL = process.env.WIKI_API_URL;
  }
  async getArticles(date: string) {
    const url = `${this.BASE_URL}/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access/${date}`;
    const response = await this.httpService.axiosRef.get(url);

    const articles = response.data.items[0].articles;

    return articles.map((article) => ({
      title: article.article,
    }));
  }
}
