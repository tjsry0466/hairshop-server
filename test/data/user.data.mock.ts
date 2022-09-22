import { plainToClass } from 'class-transformer';

import { User } from '../../src/user/entity/user.entity';

export const userDataObject = [
  {
    id: 1,
    email: 'pirit@kyojs.com',
    password: '12345678',
    name: 'pirit',
  },
];

export const userData = () => userDataObject.map((obj) => plainToClass(User, obj));
