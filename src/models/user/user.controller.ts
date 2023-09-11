/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserCreationDto } from './dto/user-creation.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserSearchDto } from './dto/user-search.dto';
import { AuthService } from '../auth/services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  
  /**
   * Área de usuários
   */

  @Get('')
  getUser(@Query() query: UserSearchDto) {
    try {
      return this.userService.getUser(query);
    } catch (error) {
      console.log('cheguei no controller');
    }
  }

  @Get('all')
  getUsers(@Query() query: UsersSearchDto) {
    return this.userService.getAllUsers(query);
  }
  @Post('')
  async createUser(@Body() body: UserCreationDto) {
    return await this.userService.createUser(body); // { name:'string' }
  }

  @Patch('')
  async updateUser(@Body() body: UserUpdateDto) {
    return await this.userService.updateUser(body);
  }

  @Delete('')
  async deleteUser(@Query() query: UserDeleteDto) {
    return await this.userService.deleteUser(query);
  }

  /**
   * Área de sessões do usuários
   */

  @Get('sessions')
  async getUserSessions(@Query() query: Pick<UserSearchDto, 'id'>) {
    return this.authService.getUserSessions(query.id);
  }

  @Delete('sessions')
  async invalidateUserSessions(@Query() query: Pick<UserSearchDto, 'id'>) {
    return await this.authService.invalidateUserSessions(query.id);
  }
}
