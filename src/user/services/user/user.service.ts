import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword
      });

      const createdUser = new this.userModel(user);
      return createdUser.save();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "error.message",
      }, HttpStatus.BAD_REQUEST,{
        cause: "error"
      })
    }
  }

  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
