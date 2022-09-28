import { Args, Query, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { IdIntArgs } from '../common/dto/id-int.args';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args() args: IdIntArgs) {
    return this.userService.getUserById(args.id);
  }

  @Roles(Role.USER)
  @Query(() => User)
  async me(@RequestInfo() req: Required<IRequest>) {
    return this.userService.getUserById(req.user.id);
  }
}
