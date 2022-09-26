import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AuthService } from './auth.service';
import { LoginArgs, SignupArgs, SignupOutput, TokenOutput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenOutput)
  async login(@Args() loginArg: LoginArgs) {
    return this.authService.login(loginArg);
  }

  @Roles(Role.USER)
  @Mutation(() => TokenOutput)
  async loginByRefreshToken(@RequestInfo() req: Required<IRequest>) {
    if (!req.user.refresh) {
      throw new UnauthorizedException();
    }

    return this.authService.loginByRefreshToken(req.user);
  }

  @Mutation(() => SignupOutput)
  async signup(@Args() args: SignupArgs) {
    return this.authService.signup(args);
  }
}
