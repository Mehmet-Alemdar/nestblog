import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String})
  name: string;

  @Prop({ required: true, type: String, unique: true})
  email: string;

  @Prop({ required: true, type: String})
  password: string;

  @Prop({ required: true, type: Number})
  age: number;

  @Prop({ required: false, type: [String]})
  blogPosts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);