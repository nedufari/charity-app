import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string): Types.ObjectId {
    const objectId = Types.ObjectId.isValid(value) && new Types.ObjectId(value);
    if (!objectId) {
      throw new BadRequestException('Invalid ID!');
    }
    return objectId;
  }
}
