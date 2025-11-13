import { IsString, IsEmail, MinLength } from 'class-validator';

export class signUpDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  department: string;

  @IsString()
  designation: string;

  @IsString()
  role: string;

}