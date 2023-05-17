import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';

const Types = mSchema.Types;

export type UniversitySchema = University & HydratedDocument<University>;

@Schema({ versionKey: false, timestamps: true })
export class University {
  _id?: string;

  @Prop({
    type: Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: Types.String,
    required: true,
  })
  country: string;

  @Prop({
    type: Types.Array,
    required: false,
  })
  web_pages?: string[];

  @Prop({
    type: Types.Array,
    required: false,
  })
  students?: string[];
}

export const UniversitySchema = SchemaFactory.createForClass(University);
