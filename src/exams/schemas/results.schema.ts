import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';

const Types = mSchema.Types;

export type ResultDocument = Result & HydratedDocument<Result>;
@Schema({ versionKey: false, timestamps: true })
export class Result {
  _id?: string;
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  studentId: string;

  @Prop({
    type: Types.Number,
    required: true,
  })
  result: number;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
