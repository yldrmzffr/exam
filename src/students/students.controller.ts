import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../bootstrap/common/pipes/parse-object-id.pipe';
import { Student } from './schemas/student.schema';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate students automatically.' })
  async generate(@Query('count') count: number): Promise<Student[]> {
    return this.studentsService.generate(count);
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAll(): Promise<Student[]> {
    return this.studentsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  async getById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<Student> {
    return this.studentsService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student by id' })
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student by id' })
  async delete(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<Student> {
    return this.studentsService.delete(id);
  }

  @Get(':id/result')
  async getStudentResult(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.studentsService.getResultsByStudentId(id);
  }
}
