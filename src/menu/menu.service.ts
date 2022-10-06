import { Injectable } from '@nestjs/common';

import { Exceptions } from '../common/exceptions';
import { ShopService } from '../shop/shop.service';
import { IAddMenu } from './repository/interface/add-menu-with-info.interface';
import { MenuRepository } from './repository/menu.repository';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly shopService: ShopService,
  ) {}

  async getMenuById(id: number) {
    return this.menuRepository.getOneById(id);
  }

  async addMenu(args: IAddMenu) {
    const shop = await this.shopService.getShopById(args.shopId);
    if (!shop) {
      throw Exceptions.shopNotFoundError;
    }

    if (args.userId !== shop.ownerId) {
      throw Exceptions.notPermittedError;
    }

    const priceInfo = { normalPrice: args.price, salesPrice: args.price };
    if (args.discountRate) {
      const salesPrice = args.price - args.price * (args.discountRate / 100);
      priceInfo.salesPrice = salesPrice;
    }

    const { price, userId, ...addMenuArgs } = args;
    await this.menuRepository.addMenu({ ...addMenuArgs, ...priceInfo });
    return true;
  }
}
