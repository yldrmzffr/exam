import { Controller, Get, Query } from '@nestjs/common';
import { ExamsService } from './services/exams.service';
import { ApiTags } from '@nestjs/swagger';
import { ResultsService } from './services/results.service';
import { Result } from './schemas/results.schema';
import { InvalidDateException } from './exceptions/invalid-date.exception';

@ApiTags('Exams')
@Controller('exams')
export class ExamsController {
  constructor(
    private readonly examService: ExamsService,
    private readonly resultsService: ResultsService,
  ) {}

  @Get('/startExam')
  async exam(@Query('examDate') examDate: string) {
    const inputDate: Date = new Date(examDate);
    if (inputDate.toString() === 'Invalid Date') {
      throw new InvalidDateException();
    }
    return this.examService.startExam(inputDate);
  }

  @Get('/results')
  async results(): Promise<Result[]> {
    return this.resultsService.getResults();
  }
}
