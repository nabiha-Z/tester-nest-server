import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtService } from 'src/JWT/jwt.service';
import { jwtConstants } from 'src/Auth/constants';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [UsersController],
  providers: [UsersService, JwtService,]
})
export class UsersModule {}
