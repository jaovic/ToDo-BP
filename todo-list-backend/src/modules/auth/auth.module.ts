import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { SmsService } from '../sms/sms.service';
import { localStrategy } from './estrategies/local.strategy';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LoginUserService } from './service/reading/loginUser.service';
import { CreateUserService } from './service/writing/createUser.service';
import { GetTokenService } from './service/writing/getToken.service';
import { LogoutUserService } from './service/writing/logoutUser.service';
import { RefreshTokenService } from './service/writing/refreshToken.service';
import { ValidateUserService } from './service/writing/validateUser.service';
import { VerifyCodeService } from './service/writing/verifyCode.service';
import { VerifyTokenService } from './service/reading/verifyToken.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '40m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUserService,
    CreateUserService,
    GetTokenService,
    LogoutUserService,
    RefreshTokenService,
    ValidateUserService,
    VerifyCodeService,
    localStrategy,
    JwtStrategy,
    SmsService,
    PrismaService,
    AuthRepository,
    VerifyTokenService,
  ],
})
export class AuthModule {}
