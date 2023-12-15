import { Controller, UsePipes, Get, ValidationPipe, Body, Param } from '@nestjs/common';
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
}
