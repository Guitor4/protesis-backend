/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  HttpStatus,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { UserPasswordRedefinitionDto } from '../dto/user-password-redefinition.dto';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../dto/login.dto';
import { EntityNotFoundError } from 'typeorm';
import * as crypto from 'crypto';
import 'dotenv-config';
import { SessionRepository } from '../repository/session.repository';
import { UserSearchDto } from 'src/models/user/dto/user-search.dto';
import { SessionSearchDTO } from '../dto/session-search.dto';
import { SendEmailService } from 'src/shared/services/sendemail.service';

@Injectable()
export class AuthService {
  constructor(
    protected userRepository: UserRepository,
    protected sessionRepository: SessionRepository,
    protected sendEmailService: SendEmailService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDTO) {
    try {
      const user = (await this.userRepository.getUserLoginByUsername({
        username: data.username,
      })) as Partial<User>;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (!bcrypt.compareSync(data.password, user.password!)) {
        throw new UnauthorizedException();
      }

      delete user.username;
      delete user.password;

      const token = this.jwtService.sign(
        { user },
        {
          secret: process.env.JWT_CONSTANT,
          expiresIn: '60s',
        },
      );
      const existingSession = await this.sessionRepository.getSessionByUser({
        user,
      });

      if (existingSession) {
        const deletedSession = await this.sessionRepository.deleteSession(
          existingSession,
        );
        console.log('sessão deletada  =====> ', deletedSession);
      }
      const createdSession = await this.sessionRepository.createSession({
        user,
        token,
      });
      console.log(createdSession);
      return createdSession;
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, data.username);
        case UnauthorizedException:
          throw new UnauthorizedException('Usuário ou senha incorretos');
        default:
          console.log(error);
          throw new Error(error);
      }
    }
  }

  //Falta terminar
  async requestPasswordReset(
    data: Pick<UserSearchDto, 'email'>,
  ): Promise<void> {
    try {
      const user = await this.userRepository.getUserByEmail(data);

      //Talvez gerar um token e enviá-lo como parâmetro pra essa função;
      // Esse token precisará ser salvo no banco para posterior consulta e redefinição da senha;
      // OBS: não precisa ser um token grande, pode ser um número de 6 à 8 dígitos
      return this.sendEmailService.sendPasswordResetTokenEmail(user.email);

    } catch (error) {
      switch(error.constructor){
        case EntityNotFoundError:
          throw new EntityNotFoundError('Usuário', data.email);
        default: 
          throw new Error(error);
      }
    }
  }
  async redefineUserPassword(
    data: UserPasswordRedefinitionDto,
  ): Promise<string> {
    try {
      //Implementar redefinição de senha baseado em um código de segurança gerado e enviado ao usuário anteriormente por meio da rota de Requisição de reset de senha (RequestPasswordReset)
      return 'a';
    } catch (error) {
      throw new Error();
    }
  }

  async getUserSessions(id: number) {
    try {
      const user = await this.userRepository.getUserById({ id });

      return this.sessionRepository.getUserSessions({ user });
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new HttpException(
            'Usuário não encontrado',
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new Error(error);
      }
    }
  }

  async invalidateUserSessions(id: number) {
    try {
      const user = await this.userRepository.getUserById({ id });
      this.sessionRepository.deleteUserSessions({ user });
    } catch (error) {}
  }
}
