import { NotImplementedException } from '@nestjs/common';

import { IRequest } from '../common/interface';
import { LoginArgs, SignupInput } from './dto';

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
