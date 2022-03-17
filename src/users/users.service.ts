import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashPass } from '../utils/hash-pass';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    let user = await this.findByUsername(createdUser.username);
    if (user && user.username == createdUser.username) {
      throw new HttpException(
        'username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    user = await this.findBy({ email: createdUser.email });
    if (user && user.email == createdUser.email) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }

    user = await this.findBy({ mobile_number: createdUser.mobile_number });
    if (user && user.mobile_number == createdUser.mobile_number) {
      throw new HttpException(
        'mobile number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    createdUser.password = await HashPass(createdUser.password);
    createdUser.status = 0;
    createdUser.createdAt = new Date();
    createdUser.updatedAt = new Date();
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findBy(condition: any) {
    console.log(condition);
    return this.userModel.findOne(condition).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
