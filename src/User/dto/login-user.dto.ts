import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
export class LoginUserDto {

  @IsNotEmpty()
  @Length(8, 20)
  @Matches( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/,{
    message:'Password must be 8-20 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string; 
}