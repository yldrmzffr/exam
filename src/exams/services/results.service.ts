import { Injectable } from '@nestjs/common';
import { LogMe } from '../../bootstrap/common/decorators/log.decorator';
import { ResultsRepository } from '../repositories/results.repository';
import { Result } from '../schemas/results.schema';
import { ResultNotFoundException } from '../exceptions/result-not-found.exception';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ResultsService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly resultsRepository: ResultsRepository,
  ) {}

  @LogMe()
  async addResult(studentId: string, result: number): Promise<Result> {
    return this.resultsRepository.create({ studentId, result });
  }

  async addResults(results: Result[]): Promise<Result[]> {
    return this.resultsRepository.createMany(results);
  }

  @LogMe()
  async getResults(): Promise<Result[]> {
    return this.resultsRepository.getAll();
  }

  @LogMe()
  async getResultsByStudentId(studentId: string): Promise<Result> {
    const result: Result = await this.resultsRepository.getByStudentId(
      studentId,
    );

    if (!result) {
      throw new ResultNotFoundException();
    }

    return result;
  }

  @LogMe()
  async deleteAll() {
    return this.resultsRepository.deleteAll();
  }
}
