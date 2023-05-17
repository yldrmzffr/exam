import { NotFoundException } from '@nestjs/common';

export class UniversityNotFoundException extends NotFoundException {
  constructor() {
    super('University not found');
  }
}
