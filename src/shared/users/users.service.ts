import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {password} = createUserDto;
    //con esto se encripta
    const plainToHash = await hash(password,10) //clave encipta..
    //aki estamos sobre escribiedno las clave ...... del DTO
    createUserDto = {...createUserDto, password:plainToHash}
    const UserNew = new this.userModel(createUserDto);
    return await UserNew.save();
  }

  async findAllUser(): Promise<User[]> {
    const UserAll = await this.userModel.find();
    return UserAll;
  }

  async findOneUser(id: string): Promise<User> {
    const UserId = await this.userModel.findById(id);
    return UserId;
  }
  async findEmail(email: string): Promise<User> {
    const userEmail = await this.userModel.findOne({ email });
    return userEmail;
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const UserUpdate = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return UserUpdate;
  }

  async removeUser(id: string): Promise<User> {
    const UserRemove = await this.userModel.findByIdAndDelete(id);
    return UserRemove;
  }
}
