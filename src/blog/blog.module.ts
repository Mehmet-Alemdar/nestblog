import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog/blog.controller';
import { BlogService } from './service/blog/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blog.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
@Module({
  imports: [MongooseModule.forFeature([
    { name: Blog.name, schema: BlogSchema}, 
    { name: User.name, schema: UserSchema}]
  )],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
