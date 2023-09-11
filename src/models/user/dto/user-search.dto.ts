import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserSearchDto {
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    username: number;
  }
  