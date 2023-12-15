import { Injectable, HttpException, HttpStatus, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../../schema/blog.schema';
import { User } from 'src/user/schema/user.schema';
import { CreateBlogDto } from 'src/blog/dtos/createBlog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private blogModel: Model<Blog>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({ _id: createBlogDto.userId }).exec();
      if(!user) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
      }
      const createdBlog = new this.blogModel({
        ...createBlogDto,
        user: user
      });

      await this.userModel.findOneAndUpdate({ _id: createBlogDto.userId }, { $push: { blogPosts: createdBlog } }, { new: true }).exec();

      return createdBlog.save();
    } catch (error) {
      throw new HttpException("Someting went wrong", HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    console.log(id)
    return await this.blogModel.findOne({ _id: id }).exec();
  }
}
