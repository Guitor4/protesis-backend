import { IsNotEmpty } from 'class-validator';

export class UserSearchDto {
    @IsNotEmpty()
    id: number;
  }
  