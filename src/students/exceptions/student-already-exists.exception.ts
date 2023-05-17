import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentAlreadyExistsException extends HttpException {
  constructor() {
    super('Student already exists', HttpStatus.CONFLICT);
  }
}
