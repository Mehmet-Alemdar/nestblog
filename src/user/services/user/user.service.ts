import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { LoginUserDto } from 'src/user/dtos/loginUser.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
    if(!user) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Invalid credentials",
      }, HttpStatus.BAD_REQUEST)
    }

    const isPasswordMatching = await bcrypt.compare(loginUserDto.password, user.password);

    if(!isPasswordMatching) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Invalid password",
      }, HttpStatus.BAD_REQUEST)
    }

    const token = jwt.sign({ userId: user.id}, 'secret', { expiresIn: '1h' });
    return { token }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }
}
