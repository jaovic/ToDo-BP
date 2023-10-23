import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GetTokenService } from "./getToken.service";
import { IGetTokenService, IRefreshTokenReturn, IRefreshTokenService } from "../../structure/IService.structure";
import { AuthRepository } from "../../repository/auth.repository";
import { IAuthRepository } from "../../structure/IRepository.structure";

@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(GetTokenService)
    private readonly getTokenService: IGetTokenService
  ) {}
async execute(req: any): Promise<IRefreshTokenReturn> {
    const user = await this.authRepository.findByRefreshToken(
      req.headers.authorization.split(' ')[1],
    );
    if (!user) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return await this.getTokenService.execute(user.id, user.email);
  }
}