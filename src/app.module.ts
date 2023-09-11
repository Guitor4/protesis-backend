import { SharedServicesModule } from './shared/services/sharedservices.module';
import { ValidUserTokenModule } from './shared/middlewares/valid-user-token.module';
import { SendEmailService } from './shared/services/sendemail.service';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
// import { DataBaseConnection } from './database/database.config';
import 'dotenv-config';
import { DataBaseConnection } from './database/database.config';
import { from } from 'rxjs';
import { UserController } from './models/user/user.controller';
import { ValidUserTokenMiddleware } from './shared/middlewares/valid-user-token.middleware';
import { AuthController } from './models/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DataBaseConnection,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidUserTokenMiddleware).exclude({path: '/user', method: RequestMethod.POST}).forRoutes(UserController);
  }
}
