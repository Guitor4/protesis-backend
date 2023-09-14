import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
  
  @IsString()
  @IsOptional()
  lastName: string;
  
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
