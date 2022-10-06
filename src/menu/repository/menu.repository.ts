import { EntityRepository, Repository } from 'typeorm';

import { Menu } from '../entity/menu.entity';
import { IAddMenuWithInfo } from '../interface/add-menu.interface';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  async addMenu(args: IAddMenuWithInfo) {
    return this.save(this.create(args));
  }
}
