import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import { JwtService } from 'src/JWT/jwt.service';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, 
    private readonly jwtService: JwtService) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto): Promise<{}> {
    return this.userService.create(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.signIn(loginUserDto);
    return user
  }

  @Post('o-auth')
  async OAuth(@Req() req: Request) {
    const user =req.body.user
    user.password = ""
    return await this.userService.oauth(user)
  }

  @UseGuards(AuthGuard)
  @Get('authorize')
  async validate(@Req() request: Request){
   return request['access']
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Req() request: Request): boolean {
    this.jwtService.revokeToken(request.headers.authorization);
    return this.jwtService.isTokenRevoked(request.headers.authorization)
  }
}
