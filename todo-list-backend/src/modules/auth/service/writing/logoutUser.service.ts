import { Inject, Injectable } from "@nestjs/common";
import { AuthRepository } from "../../repository/auth.repository";
import { ILogoutUserService } from "../../structure/IService.structure";
import { IAuthRepository } from "../../structure/IRepository.structure";

@Injectable()
export class LogoutUserService implements ILogoutUserService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

async execute(id: string): Promise<true> {
    return await this.authRepository.logout(id);
}
}