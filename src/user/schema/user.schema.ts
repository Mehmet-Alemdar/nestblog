import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from 'src/blog/schema/blog.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String})
  profilePicture: string;
  
  @Prop({ required: true, type: String})
  name: string;

  @Prop({ required: true, type: String, unique: true})
  email: string;

  @Prop({ required: true, type: String})
  password: string;

  @Prop({ required: true, type: Number})
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  blogPosts: Blog[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  likedPosts: Blog[];
}

export const UserSchema = SchemaFactory.createForClass(User);