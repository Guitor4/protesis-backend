/*
https://docs.nestjs.com/modules
*/

import { Module, Session } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/models/auth/auth.module';
import { User } from 'src/models/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session]), AuthModule],
  controllers: [],
  providers: [],
})
export class ValidUserTokenModule {}
