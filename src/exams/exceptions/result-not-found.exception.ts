import { NotFoundException } from '@nestjs/common';

export class ResultNotFoundException extends NotFoundException {
  constructor() {
    super('Result not found');
  }
}
