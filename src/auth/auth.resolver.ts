import { NotImplementedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';

import { IRequest } from '../common/interface';
import { LoginArgs, SignupInput, SignupOutput, TokenOutput } from './dto';

@Resolver()
export class AuthResolver {
  @Query(() => Boolean)
  async test() {
    return true;
  }

  @Mutation(() => TokenOutput)
  async login(@Args() loginArg: LoginArgs, @RequestInfo() req: IRequest) {
    throw new NotImplementedException();
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async logout(@RequestInfo() req: Required<IRequest>) {
    throw new NotImplementedException();
  }

  @Roles(Role.USER)
  @Mutation(() => TokenOutput)
  async loginByRefreshToken(@RequestInfo() req: Required<IRequest>) {
    throw new NotImplementedException();
  }

  @Mutation(() => SignupOutput)
  async signup(@Args('user') input: SignupInput, @RequestInfo() req: IRequest) {
    throw new NotImplementedException();
  }
}
