import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
        AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
