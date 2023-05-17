import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LogMe } from '../bootstrap/common/decorators/log.decorator';
import { StudentAlreadyExistsException } from './exceptions/student-already-exists.exception';
import { StudentsRepository } from './repositories/students.repository';
import { StudentNotFoundException } from './exceptions/student-not-found';
import { Student } from './schemas/student.schema';
import { Result } from '../exams/schemas/results.schema';
import { ResultsService } from '../exams/services/results.service';
import { PinoLogger } from 'nestjs-pino';
import { StudentHttpClientService } from '../bootstrap/http-client/student.http-client/student.http-client.service';
import { StudentApiResponse } from '../bootstrap/http-client/student.http-client/student.http-client.types';
import { maskStudents, prepareStudents } from './logic';
import { StudentForExam } from './types/student-for-exam.type';

@Injectable()
export class StudentsService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly studentRepository: StudentsRepository,
    private readonly resultService: ResultsService,
    private readonly studentHttpClientService: StudentHttpClientService,
  ) {}

  @LogMe()
  async generate(count: number): Promise<Student[]> {
    await this.studentRepository.clear();

    const apiResponse: StudentApiResponse =
      await this.studentHttpClientService.getStudentsFromApi(count);

    const students: Student[] = await prepareStudents(apiResponse);

    return this.studentRepository.bulkCreate(students);
  }
  @LogMe()
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { email, phone } = createStudentDto;
    const existingStudent: Student =
      await this.studentRepository.findWithEmailOrPhone(email, phone);

    if (existingStudent?.isDeleted === false) {
      throw new StudentAlreadyExistsException();
    }

    if (existingStudent) {
      return this.studentRepository.restore(existingStudent._id);
    }

    return this.studentRepository.create(createStudentDto);
  }

  @LogMe()
  async getAll(): Promise<Student[]> {
    return this.studentRepository.getAll();
  }

  @LogMe()
  async getById(id: string): Promise<Student> {
    const student: Student = await this.studentRepository.getById(id);

    if (!student) {
      throw new StudentNotFoundException();
    }

    return student;
  }

  @LogMe()
  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    await this.getById(id);

    return this.studentRepository.update(id, updateStudentDto);
  }

  @LogMe()
  async delete(id: string): Promise<Student> {
    await this.getById(id);
    return this.studentRepository.delete(id);
  }

  @LogMe()
  async getAllForExam(): Promise<StudentForExam[]> {
    const students: Student[] = await this.studentRepository.getAll();

    return maskStudents(students);
  }

  @LogMe()
  async getStudentsByIds(ids: string[]): Promise<Student[]> {
    return this.studentRepository.getByIds(ids);
  }

  @LogMe()
  async getResultsByStudentId(id: string): Promise<Result> {
    return this.resultService.getResultsByStudentId(id);
  }
}
