import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserCreationDto } from './dto/user-creation.dto';
import { UserDeleteDto } from './dto/user-delete.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) protected OrmUserRepository: Repository<User>,
  ) {}

  public async getAllUsers(searchParams: UsersSearchDto): Promise<User[]> {
    return await this.OrmUserRepository.find({
      take: searchParams.pageSize,
      skip: searchParams.skip,
    });
  }

  public async getUserById(
    searchParams: Pick<User, 'id'>,
  ): Promise<User> {
    try {
      return await this.OrmUserRepository.findOneOrFail({
        where: { id: searchParams.id },
      });
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, searchParams.id);
        default:
          throw new Error(error);
      }
    }
  }

  public async getUserByEmail(
    searchParams: Pick<User, 'email'>,
  ): Promise<User> {
    try {
      return await this.OrmUserRepository.findOneOrFail({
        where: { email: searchParams.email }, select: ['password', 'login']
      });
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, searchParams.email);
        default:
          throw new Error(error);
      }
    }
  }

  public async getUserByLogin(
    searchParams: Pick<User, 'login'>,
  ): Promise<User> {
    try {
      return await this.OrmUserRepository.findOneOrFail({
        where: { login: searchParams.login }, select: ['login', 'password', 'email', 'name', 'lastName', 'id']
      });
    } catch (error) {
      switch (error.constructor) {
        case EntityNotFoundError:
          throw new EntityNotFoundError(User, searchParams.login);
        default:
          throw new Error(error);
      }
    }
  }

  public async createUser(user: UserCreationDto): Promise<User> {
    return await this.OrmUserRepository.save(user);
  }

  async updateUser(user: UserCreationDto): Promise<User> {
    return (await this.OrmUserRepository.update(user, user)).raw[0];
  }

  async deleteUser(searchParam: UserDeleteDto): Promise<User> {
    return (await this.OrmUserRepository.softDelete({ id: searchParam.id }))
      .raw[0];
  }
}
