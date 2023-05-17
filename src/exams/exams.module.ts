import { forwardRef, Module } from '@nestjs/common';
import { ExamsService } from './services/exams.service';
import { ExamsController } from './exams.controller';
import { StudentsModule } from '../students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from './schemas/results.schema';
import { ResultsRepository } from './repositories/results.repository';
import { ResultsService } from './services/results.service';
import { UniversitiesModule } from '../universities/universities.module';
import { HttpClientModule } from '../bootstrap/http-client/http-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Result.name,
        schema: ResultSchema,
      },
    ]),
    HttpClientModule,
    UniversitiesModule,
    forwardRef(() => StudentsModule),
  ],
  controllers: [ExamsController],
  providers: [ExamsService, ResultsService, ResultsRepository],
  exports: [ResultsService],
})
export class ExamsModule {}
