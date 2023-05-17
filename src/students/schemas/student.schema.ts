import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';

const Types = mSchema.Types;

export type StudentDocument = Student & HydratedDocument<Student>;
@Schema({ versionKey: false, timestamps: true })
export class Student {
  _id?: string;
  @Prop({
    type: Types.String,
    required: false,
  })
  gender?: string;

  @Prop({
    type: Types.String,
  })
  name: string;

  @Prop({
    type: Types.Date,
  })
  birthdate: Date;

  @Prop({
    type: Types.String,
  })
  country: string;

  @Prop({
    type: Types.String,
  })
  email: string;

  @Prop({
    type: Types.String,
  })
  phone: string;

  @Prop({
    type: Types.Boolean,
    default: false,
  })
  isDeleted?: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
