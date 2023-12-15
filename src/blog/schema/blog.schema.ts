import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ required: true, type: String})
  title: string;

  @Prop({ required: true, type: String})
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({ type: Date, default: Date.now})
  createdAt: Date;

  @Prop({ type: Number, default: 0})
  likes: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);