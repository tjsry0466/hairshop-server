import { plainToClass } from 'class-transformer';

import { Shop } from '../../src/shop/entity/shop.entity';

export const shopDataObject = [
  {
    id: 1,
  },
];

export const shopData = () => shopDataObject.map((obj) => plainToClass(Shop, obj));
