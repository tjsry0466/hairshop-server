import { EntityRepository, Repository } from 'typeorm';

import { Shop } from '../entity/shop.entity';
import { IAddShop } from '../interface/add-shop.interface';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  async getOneById(id: number) {
    return this.findOne(id);
  }

  async addShop(args: IAddShop) {
    return this.save(this.create(args));
  }
}
