import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, ForbiddenException, Inject, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService) {}
    

  async create(registerUserDto: RegisterUserDto): Promise<{}> {
    
    const { email } = registerUserDto;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
    throw new ForbiddenException('A user with this email already exists');
  }

    const registerUser = new this.userModel(registerUserDto);
    registerUser.save();
    const payload = { username: registerUser.name, id: registerUser._id };
    return {
      access_token: await this.jwtService.signAsync(payload), payload
    };
  }

  async signIn(loginUserDto: LoginUserDto) {
    
    let { email, password} = loginUserDto;
    const user = await this.userModel.findOne({email})
    if(!user){
      throw new NotFoundException('Invalid user');
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
      throw new ForbiddenException('Invalid password');
    }
    const payload = { username: user.name, id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload), payload
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
