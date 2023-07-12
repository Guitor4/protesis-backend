import { IsNotEmpty } from 'class-validator';

export class UsersSearchDto {
    @IsNotEmpty()
    pageSize: number;
    
    @IsNotEmpty()
    skip: number;

  }
  