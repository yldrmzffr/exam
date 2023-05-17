import { forwardRef, Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { University, UniversitySchema } from './schemas/university.schema';
import { UniversityRepository } from './repositories/university.repository';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: University.name,
        schema: UniversitySchema,
      },
    ]),
    forwardRef(() => StudentsModule),
  ],
  controllers: [UniversitiesController],
  providers: [UniversitiesService, UniversityRepository],
  exports: [UniversitiesService],
})
export class UniversitiesModule {}
