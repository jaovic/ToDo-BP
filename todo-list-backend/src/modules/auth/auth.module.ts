import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./repository/auth.repository";
import { AuthService } from "./service/auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { SmsService } from "../sms/sms.service";
import { localStrategy } from "./estrategies/local.strategy";
import { JwtStrategy } from "./estrategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

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
    AuthService,
    localStrategy,
    JwtStrategy,
    SmsService,
    PrismaService,
    AuthRepository
  ],
})
export class AuthModule {}