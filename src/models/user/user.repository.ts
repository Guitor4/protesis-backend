import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersSearchDto } from './dto/users-search.dto';
import { UserSearchDto } from './dto/user-search.dto';
import { UserCreationDto } from './dto/user-creation.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDeleteDto } from './dto/user-delete.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private OrmUserRepository: Repository<User>,
  ) {}

  public async getAllUsers(searchParams: UsersSearchDto): Promise<User[]> {
    return await this.OrmUserRepository.find({
      take: searchParams.pageSize,
      skip: searchParams.skip,
    });
  }

  public async getUser(
    searchParams: UserSearchDto | UserUpdateDto,
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
