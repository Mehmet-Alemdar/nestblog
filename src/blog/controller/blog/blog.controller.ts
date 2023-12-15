import { Controller, UsePipes, Get, ValidationPipe, Body, Param, Post } from '@nestjs/common';
import { BlogService } from 'src/blog/service/blog/blog.service';
import { CreateBlogDto } from 'src/blog/dtos/createBlog.dto';
import { Blog } from 'src/blog/schema/blog.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get('findAll')
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param("id") id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Get('deleteOne/:id')
  deleteOne(@Param("id") id: string): Promise<any> {
    return this.blogService.deleteOne(id);
  }

  @Get('likeOne/:id/:userId')
  likeOne(@Param("id") id: string, @Param("userId") userId: string): Promise<any> {
    return this.blogService.likeOne(id, userId);
  }
}
