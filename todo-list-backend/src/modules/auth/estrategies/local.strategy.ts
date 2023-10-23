import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagesHelper } from 'src/modules/helpers/message.helper';
import { Strategy } from 'passport-local';
import { ValidateUserService } from '../service/writing/validateUser.service';
import { IValidateUserService } from '../structure/IService.structure';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ValidateUserService)
    private readonly validateUserService: IValidateUserService
    ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    
    const user = await this.validateUserService.execute(email, password);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    return user;
  }
}