import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AddMenuArgs } from './dto/add-menu.args';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Roles(Role.ADMIN)
  @Mutation(() => Boolean)
  async addMenu(@Args() args: AddMenuArgs, @RequestInfo() req: Required<IRequest>) {
    return this.menuService.addMenu({ ...args, userId: req.user.id });
  }
}
