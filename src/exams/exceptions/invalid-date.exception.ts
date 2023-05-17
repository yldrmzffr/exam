import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDateException extends HttpException {
  constructor() {
    super('Invalid Date', HttpStatus.BAD_REQUEST);
  }
}
