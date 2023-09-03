import { UserService } from './user.service';
import { UserController } from './user.controller';
/*
// eslint-disable-next-line prettier/prettier
https://docs.nestjs.com/modules*/
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
