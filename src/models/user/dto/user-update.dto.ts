import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;
}
