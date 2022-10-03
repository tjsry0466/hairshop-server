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

  async addMenu(args: IAddMenu) {
    const shop = await this.shopService.getShopById(args.shopId);
    if (!shop) {
      throw Exceptions.shopNotFoundError;
    }

    const priceInfo = { normalPrice: args.price, salesPrice: args.price };
    if (args.discountRate) {
      const salesPrice = args.price - args.price * (args.discountRate / 100);
      priceInfo.salesPrice = salesPrice;
    }

    const { price, ...excludePriceArgs } = args;
    await this.menuRepository.addMenu({ ...excludePriceArgs, ...priceInfo });
    return true;
  }
}
