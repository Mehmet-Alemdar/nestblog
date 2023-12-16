import { Controller, Post, Get, Body, ValidationPipe, UsePipes, UseFilters, Param, Put, Patch } from '@nestjs/common';
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

  @Get('findOne/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('updateProfilePicture/:id')
  updateProfilePicture(@Param('id') id: string, @Body('profilePicture') profilePicture: string): Promise<string> {
    return this.userService.updateProfilePicture(id, profilePicture);
  }
}
