import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { AddMenuArgs } from './dto/add-menu.args';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Roles(Role.ADMIN)
  @Mutation(() => Boolean)
  async addMenu(@Args() args: AddMenuArgs) {
    return this.menuService.addMenu(args);
  }
}
