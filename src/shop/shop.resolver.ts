import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AddShopArgs } from './dto/add-shop.args';
import { ShopService } from './shop.service';

@Resolver()
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async addShop(@Args() args: AddShopArgs, @RequestInfo() req: Required<IRequest>) {
    return this.shopService.addShop({ ...args, ownerId: req.user.id });
  }
}
