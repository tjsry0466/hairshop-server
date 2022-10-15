import { plainToClass } from 'class-transformer';

import { Reservation } from '../../src/reservation/entity/reservation.entity';

export const reservationDataObject = [
  {
    id: 1,
    shopId: 1,
    menuId: 1,
    row: 0,
    column: 0,
    reservationDate: '2022-01-01',
    startTime: new Date('2022-01-01 12:00:00'),
    endTime: new Date('2022-01-01 12:20:00'),
  },
];

export const reservationData = () =>
  reservationDataObject.map((obj) => plainToClass(Reservation, obj));
