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
import { UserPasswordRedefinitionDto } from '../auth/dto/user-password-redefinition.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getUsers(@Query() query: UsersSearchDto) {
    return this.userService.getAllUsers(query);
  }

  @Get('')
  getUser(@Query() query: UserSearchDto) {
    try {
      return this.userService.getUser(query);
    } catch (error) {
      console.log('cheguei no controller');
    }
  }

  @Post('')
  createUser(@Body() body: UserCreationDto) {
    return this.userService.createUser(body); // { name:'string' }
  }

  @Patch('')
  updateUser(@Body() body: UserUpdateDto) {
    return this.userService.updateUser(body);
  }

  @Delete('')
  deleteUser(@Query() query: UserDeleteDto) {
    return this.userService.deleteUser(query);
  }


}
