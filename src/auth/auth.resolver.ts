import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginArgs, SignupArgs, SignupOutput, TokenOutput, ResetPasswordArgs } from './dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async resetPassword(@Args() args: ResetPasswordArgs, @RequestInfo() req: Required<IRequest>) {
    return this.userService.resetPassword(args, req.user);
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async withdrawUser(@Args() id: number, @RequestInfo() req: Required<IRequest>) {
    return this.userService.withdrawUser(id, req.user);
  }
}
