import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../bootstrap/common/pipes/parse-object-id.pipe';
import { University } from './schemas/university.schema';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all universities' })
  async getAll(): Promise<University[]> {
    return this.universitiesService.getAll();
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Get all students by university id' })
  async getStudentsByUniversityId(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ) {
    return this.universitiesService.getStudentsByUniversityId(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete university by id' })
  async delete(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<University> {
    return this.universitiesService.delete(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all universities' })
  async deleteAll(): Promise<{ message: string }> {
    return this.universitiesService.deleteAll();
  }
}
