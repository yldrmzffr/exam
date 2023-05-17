import { Injectable } from '@nestjs/common';
import { LogMe } from '../../bootstrap/common/decorators/log.decorator';
import { DateCannotBeFeatureException } from '../exceptions/date-cannot-be-feature.exception';
import { StudentsService } from '../../students/students.service';
import { ResultsService } from './results.service';
import { UniversitiesService } from '../../universities/universities.service';
import { PinoLogger } from 'nestjs-pino';
import { UniversityHttpClientService } from '../../bootstrap/http-client/university.http-client/university.http-client.service';
import { WikiHttpClientService } from '../../bootstrap/http-client/wiki.http-client/wiki.http-client.service';

import {
  formatDate,
  isFutureDate,
  makeExamAndSortResult,
  placementToUniversity,
  populateStudents,
} from '../logic';
@Injectable()
export class ExamsService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly studentsService: StudentsService,
    private readonly resultsService: ResultsService,
    private readonly universitiesService: UniversitiesService,
    private readonly universityHttpClientService: UniversityHttpClientService,
    private readonly wikiHttpClientService: WikiHttpClientService,
  ) {}

  @LogMe()
  async startExam(date: Date) {
    if (isFutureDate(date)) {
      throw new DateCannotBeFeatureException();
    }

    const formattedDate = formatDate(date);

    const [articles, students, universities] = await Promise.all([
      this.wikiHttpClientService.getArticles(formattedDate),
      this.studentsService.getAllForExam(),
      this.universityHttpClientService.getUniversitiesFromApi(),
      this.resultsService.deleteAll(),
      this.universitiesService.deleteAll(),
    ]);

    const examResults = await makeExamAndSortResult(students, articles);

    const universityPlacement = await placementToUniversity(
      universities,
      examResults,
    );

    // TODO: this is a performance issue, we should use non-await methods or Promise.all
    await this.resultsService.addResults(examResults);
    await this.universitiesService.addUniversities(universityPlacement);

    return populateStudents(universityPlacement, students);
  }
}
