import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
class InvalidIdException extends HttpException {
  constructor() {
    super('Invalid id', HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string): Types.ObjectId {
    const isValid = isValidObjectId(value);
    if (!isValid) throw new InvalidIdException();

    return new Types.ObjectId(value);
  }
}
