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
} from '@nestjs/common';
import { UserPasswordRedefinitionDto } from './dto/user-password-redefinition.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { EntityNotFoundError } from 'typeorm';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      switch (error.constructor) {
        case UnauthorizedException:
          throw new HttpException('Usuário ou senha incorretos', HttpStatus.UNAUTHORIZED);
        case EntityNotFoundError:
          throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        default:
          throw new Error('Ocorreu um erro desconhecido')
      }
    }
  }

  @Put('redefine-password')
  redefinePassword(@Body() body: UserPasswordRedefinitionDto) {}
}
