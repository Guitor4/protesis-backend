import { JwtModule } from '@nestjs/jwt';

export const JwtConfig = JwtModule.register({
  global: true,
  secret: process.env.JWT_CONSTANT,
  signOptions: { expiresIn: '2s'},
});
