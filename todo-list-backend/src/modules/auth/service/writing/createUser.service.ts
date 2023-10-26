import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repository/auth.repository';
import {
  ICreateUserService,
  IcreateUser,
} from '../../structure/IService.structure';
import { SmsService } from 'src/modules/sms/sms.service';
import { User } from '@prisma/client';
import { IAuthRepository } from '../../structure/IRepository.structure';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly smsService: SmsService,
  ) {}

  async execute(createAuthDto: IcreateUser): Promise<Partial<User>> {
    const user = await this.authRepository.findByEmail(createAuthDto.email);

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const code = Math.floor(Math.random() * 9000) + 1000;
    const data = await this.authRepository.create(createAuthDto);
    await this.authRepository.saveCode(data.id, code.toString());
    await this.smsService.sendSms(createAuthDto.phone, code.toString());

    return data;
  }
}
