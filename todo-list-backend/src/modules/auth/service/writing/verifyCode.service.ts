import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repository/auth.repository';
import { IVerifyCodeService } from '../../structure/IService.structure';
import { IAuthRepository } from '../../structure/IRepository.structure';

@Injectable()
export class VerifyCodeService implements IVerifyCodeService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(email: string, code: string): Promise<true> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.codeSms == 'verificated') {
      throw new HttpException('user already verified', HttpStatus.CONFLICT);
    }
    if (user.codeSms !== code) {
      throw new HttpException('Code not verified', HttpStatus.UNAUTHORIZED);
    }
    await this.authRepository.updateCode(user.id);
    return true;
  }
}
