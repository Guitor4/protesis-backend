/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundError,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { UserCreationDto } from './dto/user-creation.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserDeleteDto } from './dto/user-delete.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(searchParams: UsersSearchDto) {
    try {
      return this.userRepository.find({
        skip: searchParams.skip,
        take: searchParams.pageSize,
      });
    } catch (error) {
      throw new Error(error.detail);
    }
  }

  async createUser(data: UserCreationDto): Promise<User | undefined> {
    try {
      return await this.userRepository.save(data);
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
      const user = await this.userRepository.findOneOrFail({
        where: { id: data.id },
      });
      return this.userRepository.save(user);
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

  async deleteUser(userId: UserDeleteDto) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: +userId.userId },
      });
      await this.userRepository.softDelete({id: user.id});
      return `Usuário n° ${user.id}, ${user.name + ' ' +user.lastName} excluído com sucesso !!`
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
