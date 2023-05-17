import { Injectable } from '@nestjs/common';
import { UniversityRepository } from './repositories/university.repository';
import { LogMe } from '../bootstrap/common/decorators/log.decorator';
import { University } from './schemas/university.schema';
import { UniversityNotFoundException } from './exceptions/university-not-found.exception';
import { StudentsService } from '../students/students.service';
import { PinoLogger } from 'nestjs-pino';
import { Student } from '../students/schemas/student.schema';

@Injectable()
export class UniversitiesService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly universityRepository: UniversityRepository,
    private readonly studentsService: StudentsService,
  ) {}

  @LogMe()
  async create(university: University): Promise<University> {
    return this.universityRepository.create(university);
  }

  @LogMe()
  async addUniversities(universities: University[]): Promise<University[]> {
    return this.universityRepository.addUniversities(universities);
  }

  @LogMe()
  async getAll(): Promise<University[]> {
    return this.universityRepository.getAll();
  }

  @LogMe()
  async delete(id: string): Promise<University> {
    const university: University = await this.universityRepository.getById(id);

    if (!university) {
      throw new UniversityNotFoundException();
    }

    return this.universityRepository.delete(id);
  }

  @LogMe()
  async deleteAll(): Promise<{ message: string }> {
    await this.universityRepository.deleteAll();

    return {
      message: 'All universities have been deleted',
    };
  }

  @LogMe()
  async getStudentsByUniversityId(id: string) {
    const university = await this.universityRepository.getById(id);

    if (!university) {
      throw new UniversityNotFoundException();
    }

    const studentIds: string[] = university.students;
    const students: Student[] = await this.studentsService.getStudentsByIds(
      studentIds,
    );

    return {
      ...university,
      students: students,
    };
  }
}
