import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './repositories/students.repository';
import { ExamsModule } from '../exams/exams.module';
import { HttpClientModule } from '../bootstrap/http-client/http-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
    HttpClientModule,
    ExamsModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
  exports: [StudentsService],
})
export class StudentsModule {}
