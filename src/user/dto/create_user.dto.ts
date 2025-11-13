import { IsString, IsEmail, MinLength, isString } from 'class-validator';

export class createUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  designation: string;

  @IsString()
  department: string;

  @IsString()
  role: string;

}