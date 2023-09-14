import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtConfig } from './configs/jwt.config';
import { SessionRepository } from './repository/session.repository';
import { UserSession } from './entity/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedServicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [UserModule, JwtConfig, TypeOrmModule.forFeature([UserSession]), SharedServicesModule],
  controllers: [AuthController],
  providers: [AuthService, SessionRepository],
  exports:[AuthService, SessionRepository]
})
export class AuthModule {}
