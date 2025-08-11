import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  createdDt: Date;

  @Prop()
  updatedDt: Date;
}

// 스키마 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);
