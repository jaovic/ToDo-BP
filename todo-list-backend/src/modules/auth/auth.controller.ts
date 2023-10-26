import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SingUpAuthDto } from './dto/singup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { verifyCodeAuthDto } from './dto/verifyCode.dto';
import { CreateUserService } from './service/writing/createUser.service';
import {
  ICreateUserService,
  ILoginUserService,
  ILogoutUserService,
  IRefreshTokenService,
  IVerifyCodeService,
  IVerifyTokenService,
} from './structure/IService.structure';
import { LoginUserService } from './service/reading/loginUser.service';
import { LogoutUserService } from './service/writing/logoutUser.service';
import { RefreshTokenService } from './service/writing/refreshToken.service';
import { VerifyCodeService } from './service/writing/verifyCode.service';
import { VerifyTokenService } from './service/reading/verifyToken.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: ICreateUserService,
    @Inject(LoginUserService)
    private readonly loginUserService: ILoginUserService,
    @Inject(LogoutUserService)
    private readonly logoutUserService: ILogoutUserService,
    @Inject(RefreshTokenService)
    private readonly refreshTokenService: IRefreshTokenService,
    @Inject(VerifyCodeService)
    private readonly verifyCodeService: IVerifyCodeService,
    @Inject(VerifyTokenService)
    private readonly verifyTokenService: IVerifyTokenService,
  ) {}

  @Post('singup')
  async singUp(@Body() singUpAuthDto: SingUpAuthDto) {
    return await this.createUserService.execute(singUpAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    return await this.loginUserService.execute(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: any) {
    return await this.logoutUserService.execute(req.user.id);
  }

  @Get('refreshtoken')
  async refreshToken(@Req() req: any) {
    return await this.refreshTokenService.execute(req);
  }

  @Post('verify')
  async verifyCode(@Body() body: verifyCodeAuthDto) {
    return await this.verifyCodeService.execute(body.email, body.code);
  }

  @Get('verifyToken')
  async verifyToken(@Req() req: any) {
    return await this.verifyTokenService.execute(req);
  }
}
