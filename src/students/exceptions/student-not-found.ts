import { NotFoundException } from '@nestjs/common';

export class StudentNotFoundException extends NotFoundException {
  constructor() {
    super('Student not found');
  }
}
