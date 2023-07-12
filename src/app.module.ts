import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConnection } from './database/database.config';

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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
