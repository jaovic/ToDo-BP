import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SingUpAuthDto } from './dto/singup-auth.dto';
import { AuthService } from './service/auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { verifyCodeAuthDto } from './dto/verifyCode.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  async singUp(@Body() singUpAuthDto: SingUpAuthDto) {
    return await this.authService.create(singUpAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    console.log('teste')
    return await this.authService.login(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: any) {
    return await this.authService.logout(req.user.id);
  }

  @Get('refreshtoken')
  async refreshToken(@Req() req: any) {
    return await this.authService.refreshToken(req);
  }

  @Post('verify')
  async verifyCode(@Body() body: verifyCodeAuthDto) {
    return await this.authService.verifyCode(body.email, body.code);
  }
}