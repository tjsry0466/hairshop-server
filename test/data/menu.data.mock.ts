import { plainToClass } from 'class-transformer';

import { Gender } from '../../src/common/enum/gender';
import { Menu } from '../../src/menu/entity/menu.entity';

export const menuDataObject = [
  {
    id: 1,
    shopId: 1,
    name: '시술 1',
    includeCutOption: true,
    includeShampooOption: true,
    price: 10000,
    requireMinute: 20,
    description: '아주 좋아요 !',
    discountRate: 20,
    gender: Gender.MALE,
    imageUrls: ['https://naver.com/image'],
  },
];

export const menuData = () => menuDataObject.map((obj) => plainToClass(Menu, obj));
