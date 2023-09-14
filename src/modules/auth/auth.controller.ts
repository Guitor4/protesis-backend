/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  HttpStatus,
  UnauthorizedException,
  HttpException,
  Get,
  Query,
} from '@nestjs/common';
import { UserPasswordRedefinitionDto } from './dto/user-password-redefinition.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { EntityNotFoundError } from 'typeorm';
import { User } from '../user/user.entity';
import { SendEmailService } from 'src/shared/services/sendemail.service';
import { SessionSearchDTO } from './dto/session-search.dto';
import { UserSearchDto } from '../user/dto/user-search.dto';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async username(@Body() body: LoginDTO) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      switch (error.constructor) {
        case UnauthorizedException:
          throw new HttpException(
            'Usuário ou senha incorretos',
            HttpStatus.UNAUTHORIZED,
          );
        case EntityNotFoundError:
          throw new HttpException(
            'Usuário não encontrado',

            HttpStatus.NOT_FOUND,
          );
        default:
          throw new Error('Ocorreu um erro desconhecido');
      }
    }
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() body: Pick<UserSearchDto, 'email'>) {
    try {
      return await this.authService.requestPasswordReset(body);
    } catch (error) {
      console.log(error.constructor)
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new HttpException(
            'Nenhuma conta vinculada a este email foi encontrada',
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException('Ocorreu um erro', HttpStatus.EXPECTATION_FAILED)
      }
    }
  }

  @Put('redefine-password')
  async redefinePassword(@Body() body: UserPasswordRedefinitionDto) {
    return await this.authService.redefineUserPassword(body);
  }
}
