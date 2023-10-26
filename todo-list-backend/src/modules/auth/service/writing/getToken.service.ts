import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import {
  IGetTokenRetun,
  IGetTokenService,
} from '../../structure/IService.structure';
import { IAuthRepository } from '../../structure/IRepository.structure';

@Injectable()
export class GetTokenService implements IGetTokenService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async execute(id: string, email: string): Promise<IGetTokenRetun> {
    const payload = { sub: id, email: email };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '15m',
      }),
    ]);
    await this.authRepository.updateRefreshToken(id, refreshToken);
    await this.authRepository.updateToken(id, token);
    return { token, refreshToken };
  }
}
