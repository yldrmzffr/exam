import { IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @IsString()
  @ApiProperty({
    description: 'Student Gender',
    required: false,
    example: 'Male',
  })
  gender?: string;

  @IsString()
  @ApiProperty({
    description: 'Student Name',
    required: true,
    example: 'John Doe',
  })
  name: string;

  @IsDate()
  @ApiProperty({
    description: 'Student Birthdate',
    required: true,
  })
  birthdate: Date;

  @IsString()
  @ApiProperty({
    description: 'Student Country',
    required: true,
    example: 'Turkey',
  })
  country: string;

  @IsEmail()
  @ApiProperty({
    description: 'Student Email',
    required: true,
    example: 'mail@muzaffer.dev',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Student Phone',
    required: true,
    example: '913-555-011',
  })
  phone: string;
}
