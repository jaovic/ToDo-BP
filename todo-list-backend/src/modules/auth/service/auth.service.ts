import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SingUpAuthDto } from '../dto/singup-auth.dto';
import { AuthRepository } from '../repository/auth.repository';
import { SmsService } from 'src/modules/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
  ) {}

  async create(createAuthDto: SingUpAuthDto) {
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

  async login(user: any) {
    const data = await this.authRepository.findByEmail(user.email);
    
    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isVerified = await this.authRepository.verifyCode(data.id);
    if (!isVerified) {
      throw new HttpException('Code not verified', HttpStatus.UNAUTHORIZED);
    }
    return await this.GetTokens(data.id, data.email);
  }

  async logout(id: string) {
    return await this.authRepository.logout(id);
  }

  async refreshToken(req: any) {
    const user = await this.authRepository.findByRefreshToken(
      req.headers.authorization.split(' ')[1],
    );
    if (!user) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
    return await this.GetTokens(user.id, user.email);
  }

  async validateUser(email: string, password: string) {
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
      if(!user){
        return null
      }
    } catch (error) {
      return null;
    }
    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) return null;
    return true;
  }

  async GetTokens(id: string, email: string) {
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

  async verifyCode(email: string, code: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.codeSms == 'verificated'){
      throw new HttpException('user already verified', HttpStatus.CONFLICT)
    }
    if (user.codeSms !== code) {
      throw new HttpException('Code not verified', HttpStatus.UNAUTHORIZED);
    }
    await this.authRepository.updateCode(user.id);
    return HttpStatus.OK;
  }
}