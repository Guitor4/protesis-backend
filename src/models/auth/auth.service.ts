/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserPasswordRedefinitionDto } from './dto/user-password-redefinition.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { EntityNotFoundError } from 'typeorm';
import 'dotenv-config';

@Injectable()
export class AuthService {
  constructor(
    protected userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDTO) {
    try {
      const user = (await this.userRepository.getUserByLogin({
        login: data.login,
      })) as Partial<User>;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (!bcrypt.compareSync(data.password, user.password!)) {
        throw new UnauthorizedException();
      }
      delete user.login;
      delete user.password;
      return {
        token: this.jwtService.sign(JSON.stringify(user), {
          secret: process.env.JWT_CONSTANT,
        }),
      };
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, data.login);
        case UnauthorizedException:
          throw new UnauthorizedException('Usuário ou senha incorretos');
        default:
          console.log(error);
          throw new Error(error);
      }
    }
  }

  //Falta terminar
  // async redefineUserPassword(data: UserPasswordRedefinitionDto): Promise<User> {
  //   try {
  //     const user = await this.userRepository.getUser({ id: data.id });
  //     const saltOrRounds = 10;
  //     Object.assign(user, {
  //       password: await bcrypt.hash(data.password, saltOrRounds),
  //     });

  //     return await this.userRepository.updateUser(user);
  //   } catch (error) {
  //     throw new Error();
  //   }
  // }
}
