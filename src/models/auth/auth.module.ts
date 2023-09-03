import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PasswordRedefinitionTokenMiddleware } from './middleware/password-redefinition-token.middleware';
import { UserModule } from '../user/user.module';
import { JwtConfig } from './configs/jwt.config';

@Module({
  imports: [UserModule, JwtConfig],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PasswordRedefinitionTokenMiddleware)
      .forRoutes({ path: 'auth/redefine-password', method: RequestMethod.PUT });
  }
}
