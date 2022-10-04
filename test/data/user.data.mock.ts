import { plainToClass } from 'class-transformer';

import { Role } from '../../src/common/enum';
import { User } from '../../src/user/entity/user.entity';

export const userDataObject = [
  {
    id: 1,
    email: 'pirit@kyojs.com',
    password: '12345678',
    name: 'pirit',
  },
  {
    id: 2,
    email: 'pirit@kyojs.com',
    password: '$2a$10$xxGdIYsahxU80tT.XyVTCuD/NRrCTQmIybkzS6FMVfuj.TDTswRPW',
    name: 'pirit',
    role: Role.USER,
  },
];

export const userData = () => userDataObject.map((obj) => plainToClass(User, obj));
