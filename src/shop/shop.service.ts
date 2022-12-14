import { Injectable } from '@nestjs/common';

import { IAddShop } from './interface/add-shop.interface';
import { ShopRepository } from './repository/shop.repository';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  async getShopById(id: number) {
    return this.shopRepository.getOneById(id);
  }

  async addShop(args: IAddShop) {
    await this.shopRepository.addShop(args);
    return true;
  }
}
