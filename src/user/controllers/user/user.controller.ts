import { Controller, Post, Get, Body, ValidationPipe, UsePipes, UseFilters } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { LoginUserDto } from 'src/user/dtos/loginUser.dto';
import { User } from '../../schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.userService.login(loginUserDto);
  }

  @Get('findAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
