import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IGetTokenService, ILoginUserService } from "../../structure/IService.structure";
import { GetTokenService } from "../writing/getToken.service";
import { AuthRepository } from "../../repository/auth.repository";
import { User } from "@prisma/client";
import { IAuthRepository } from "../../structure/IRepository.structure";

@Injectable()
export class LoginUserService implements ILoginUserService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(GetTokenService)
    private readonly getTokenService: IGetTokenService
  ) {}
async execute(user: any): Promise<Partial<User>> {
    const data = await this.authRepository.findByEmail(user.email);
    
    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isVerified = await this.authRepository.verifyCode(data.id);
    if (!isVerified) {
      throw new HttpException('Code not verified', HttpStatus.UNAUTHORIZED);
    }
    return await this.getTokenService.execute(data.id, data.email);
  }
}