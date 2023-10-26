import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repository/auth.repository';
import { IValidateUserService } from '../../structure/IService.structure';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../structure/IRepository.structure';

@Injectable()
export class ValidateUserService implements IValidateUserService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(email: string, password: string): Promise<true> {
    let user: {
      id: string;
      name: string;
      phone: string;
      email: string;
      password: string;
      token: string;
      Refresh_Token: string;
      isVerified: boolean;
      codeSms: string;
      createdAt: Date;
      updatedAt: Date;
    };
    try {
      user = await this.authRepository.findByEmail(email);
      if (!user) {
        return null;
      }
    } catch (error) {
      return null;
    }
    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) return null;
    return true;
  }
}
