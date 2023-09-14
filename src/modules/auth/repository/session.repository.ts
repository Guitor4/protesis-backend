import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { SessionCreationDTO } from '../dto/session-creation.dto';
import { UserSession } from '../entity/session.entity';
import { SessionSearchDTO } from '../dto/session-search.dto';
@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private TypeOrmSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(data: SessionCreationDTO): Promise<UserSession> {
    return await this.TypeOrmSessionRepository.save(data);
  }

  async getSessionByToken(data: Partial<SessionSearchDTO>):Promise<UserSession | null> {
    return await this.TypeOrmSessionRepository.findOne({
      where: { token: data.token },
    });
  }

  async getSessionByUser(data: SessionSearchDTO):Promise<UserSession | null> {
    //Objeto de busca tipado pois não estava querendo aceitar o objeto criado dentro do parâmetro da função
    const findOption: FindOneOptions<any> = {
      where: {
        user: data.user,
      } as FindOptions<any>,
    };

    return await this.TypeOrmSessionRepository.findOne(findOption);
  }

  async getUserSessions(data: Pick<SessionSearchDTO, 'user'>):Promise<UserSession[] | null> {
    //Objeto de busca tipado pois não estava querendo aceitar o objeto criado dentro do parâmetro da função
    const findOption: FindManyOptions<any> = {
      where: {
        user: data.user,
      } as FindOptions<any>,
    };

    return await this.TypeOrmSessionRepository.find({
      where: { user: { id: data.user!.id } },
      relations: ['user'],
    });
  }

  async deleteSession(data: UserSession):Promise<DeleteResult> {
    return await this.TypeOrmSessionRepository.delete(data.id);
  }

  async deleteUserSessions(data: Pick<SessionSearchDTO, 'user'>) {
    const findOption: FindOptionsWhere<any> = {
      user: { id: data.user!.id },
    } as FindOptionsWhere<any>;
    return await this.TypeOrmSessionRepository.delete(findOption);
  }
}
