/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { UserCreationDto } from './dto/user-creation.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserRepository } from './user.repository';
import { UserSearchDto } from './dto/user-search.dto';
import { UserDeleteDto } from './dto/user-delete.dto';

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {}

  async getAllUsers(searchParams: UsersSearchDto) {
    try {
      return await this.userRepository.getAllUsers(searchParams);
    } catch (error) {
      throw new Error(error.detail);
    }
  }

  async getUser(searchParams: UserSearchDto) {
    try {
      return this.userRepository.getUser(searchParams);
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, searchParams.id);
        default:
          throw new Error(error);
      }
    }
  }

  async createUser(data: UserCreationDto): Promise<User | undefined> {
    try {
      return await this.userRepository.createUser(data);
    } catch (error) {
      console.log(error);
      switch (error.constructor) {
        case QueryFailedError:
          throw new HttpException(error.detail, HttpStatus.CONFLICT);
        default:
          throw new HttpException(
            'Erro não previsto !!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  async updateUser(data: UserUpdateDto): Promise<User | undefined> {
    try {
      const user = await this.userRepository.getUser(data);
      Object.assign(user, data);
      console.log(user);
      return await this.userRepository.updateUser(user);
      // return this.userRepository.updateUser(user);
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new HttpException(
            'usuário não encontrado !!',
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            'Erro não previsto !!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  async deleteUser(data: UserDeleteDto) {
    try {
      const user = await this.userRepository.getUser({
        id: data.id,
      });
      await this.userRepository.deleteUser({ id: user.id });
      return `Usuário n° ${user.id}, ${
        user.name + ' ' + user.lastName
      } excluído com sucesso !!`;
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new HttpException(
            'usuário não encontrado !!',
            HttpStatus.NOT_FOUND,
          );
        default:
          throw new HttpException(
            'Erro não previsto !!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
