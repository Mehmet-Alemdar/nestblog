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
    return await this.blogModel.findOne({ _id: id }).exec();
  }

  async deleteOne(id: string): Promise<any> {
    await this.userModel.findOneAndUpdate({ blogPosts: id }, { $pull: { blogPosts: id } }).exec();
    return await this.blogModel.deleteOne({ _id: id }).exec();
  }

  async likeOne(id: string, userId: string): Promise<any> {
    const blog = await this.blogModel.findOne({ _id: id }).exec();
    if(!blog) {
      throw new HttpException("Blog not found", HttpStatus.BAD_REQUEST)
    }
    const user = await this.userModel.findOne({ _id: userId }).exec();
    if(!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
    }
    const isLiked = blog.likes.map(like => like.toString()).includes(user._id.toString())

    if(isLiked) {
      await this.blogModel.findOneAndUpdate({ _id: id }, { $pull: { likes: user._id } }, { new: true }).exec();
      return await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { likedPosts: blog._id } }, { new: true }).exec();
    } else {
      await this.blogModel.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true }).exec();
      return await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { likedPosts: blog } }, { new: true }).exec();
    }

  }
}
