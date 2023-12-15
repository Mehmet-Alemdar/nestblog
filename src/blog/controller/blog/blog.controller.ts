import { Controller, UsePipes, Get, ValidationPipe, Body } from '@nestjs/common';
import { BlogService } from 'src/blog/service/blog/blog.service';
import { CreateBlogDto } from 'src/blog/dtos/createBlog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  create(@Body() createBlogDto: CreateBlogDto): Promise<any> {
    return this.blogService.create(createBlogDto);
  }
}
