import { UserController } from './user.controller';
/*
// eslint-disable-next-line prettier/prettier
https://docs.nestjs.com/modules*/
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
