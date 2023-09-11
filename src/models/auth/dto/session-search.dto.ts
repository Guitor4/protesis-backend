import { IsOptional, IsString, Validate } from 'class-validator';
import { User } from 'src/models/user/user.entity';

export class SessionSearchDTO {
  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @Validate((data: User) => data instanceof User)
  user?: User | Partial<User>;
}
