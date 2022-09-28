import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { IdIntArgs } from '../common/dto/id-int.args';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AddShopArgs } from './dto/add-shop.args';
import { Shop } from './entity/shop.entity';
import { ShopService } from './shop.service';

@Resolver()
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Query(() => Shop)
  async shop(@Args() args: IdIntArgs) {
    return this.shopService.getShopById(args.id);
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async addShop(@Args() args: AddShopArgs, @RequestInfo() req: Required<IRequest>) {
    return this.shopService.addShop({ ...args, ownerId: req.user.id });
  }
}
