/*
https://docs.nestjs.com/middleware#middleware
*/

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionRepository } from '../../models/auth/repository/session.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidUserTokenMiddleware implements NestMiddleware {
  constructor(
    private sessionRepository: SessionRepository,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization?.split('Bearer')[1].trim();
    if (!token)
      throw new UnauthorizedException('Informe o token de autorização !!');

    const session = await this.sessionRepository.getSessionByToken({ token });
    if (!session)
      throw new UnauthorizedException('Token de autorização inválido !!');

    try {
      this.jwtService.verify(session.token);
    } catch (error) {
      throw new UnauthorizedException('Token de autorização expirado !!');
    }

    console.log(token)
    next();
  }
}
