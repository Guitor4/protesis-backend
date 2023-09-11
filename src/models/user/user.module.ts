import { UserService } from './user.service';
import { UserController } from './user.controller';
/*
// eslint-disable-next-line prettier/prettier
https://docs.nestjs.com/modules*/
import { Module, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {
}
