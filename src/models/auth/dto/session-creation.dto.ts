import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { User } from 'src/models/user/user.entity';

export class SessionCreationDTO {
  @Validate((data: User) => data instanceof User)
  user: User | Partial<User>;

  @IsString()
  @IsNotEmpty()
  token: string;
}
