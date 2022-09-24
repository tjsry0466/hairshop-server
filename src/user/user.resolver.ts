import { Query, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.USER)
  @Query(() => User)
  async me(@RequestInfo() req: Required<IRequest>) {
    return this.userService.getUserById(req.user.id);
  }
}
