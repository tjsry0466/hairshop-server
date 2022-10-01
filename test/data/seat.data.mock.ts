import { plainToClass } from 'class-transformer';

import { Seat } from '../../src/seat/entity/seat.entity';

export const seatDataObject = [
  {
    id: 1,
    shopId: 1,
    seat: [
      [0, 1],
      [1, 1],
    ],
    total: 4,
    nonSeatCount: 1,
    seatCount: 3,
    reservedSeatCount: 0,
    unavailableSeatCount: 0,
  },
];

export const seatData = () => seatDataObject.map((obj) => plainToClass(Seat, obj));
