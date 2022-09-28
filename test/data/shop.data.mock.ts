import { plainToClass } from 'class-transformer';

import { Shop } from '../../src/shop/entity/shop.entity';

export const shopDataObject = [
  {
    id: 1,
    email: 'pirit@kyojs.com',
    password: '12345678',
    name: 'pirit',
  },
];

export const shopData = () => shopDataObject.map((obj) => plainToClass(Shop, obj));
