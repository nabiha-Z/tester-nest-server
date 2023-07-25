import { IsEmail, IsNotEmpty, Length, IsNumber, Matches } from 'class-validator';
export class OAuthUserDto {

  @IsNotEmpty()
  @Length(8, 20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string; 
}