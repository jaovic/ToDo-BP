import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  IGetTokenService,
  IRefreshTokenReturn,
  IVerifyTokenService,
} from '../../structure/IService.structure';
import { GetTokenService } from '../writing/getToken.service';
import { AuthRepository } from '../../repository/auth.repository';
import { IAuthRepository } from '../../structure/IRepository.structure';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class VerifyTokenService implements IVerifyTokenService {
  constructor(
    @Inject(GetTokenService)
    private readonly getTokenService: IGetTokenService,
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(req: any): Promise<IRefreshTokenReturn> {
    if (!req.headers.authorization) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET);

      if (
        typeof decodedToken === 'object' &&
        'sub' in decodedToken &&
        'email' in decodedToken
      ) {
        const userId: string = decodedToken.sub;

        if (!userId) {
          throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.authRepository.findById(userId);

        if (!user) {
          throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }

        if (user.token !== token) {
          throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }

        return { token: user.token, refreshToken: user.Refresh_Token };
      } else {
        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
  }
}
