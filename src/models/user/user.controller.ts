/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('users')
  getUsers() {
    return {users : ["Bob", "Samantha", "Cleiton"]}
  }
}
