import { HttpException, HttpStatus } from '@nestjs/common';

export class DateCannotBeFeatureException extends HttpException {
  constructor() {
    super('Date cannot be in future.', HttpStatus.BAD_REQUEST);
  }
}
