import { EntityRepository, Repository } from 'typeorm';

import { Reservation } from '../entity/reservation.entity';
import { IReservationInfo } from '../interface/date-range.interface';
import { IAddReservationWithInfo } from './interface/add-reservation-with-info.interface';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async getOneByReservationInfo(args: IReservationInfo) {
    const { shopId, menuId, row, column, reservationDate, startTime, endTime } = args;
    return this.createQueryBuilder('reservation')
      .where('reservation.reservationDate = :reservationDate', {
        reservationDate,
      })
      .andWhere('reservation.shopId = :shopId', { shopId })
      .andWhere('reservation.menuId = :menuId', { menuId })
      .andWhere('reservation.row = :row', { row })
      .andWhere('reservation.column = :column', { column })
      .andWhere('reservation.isCanceled = 0')
      .andWhere('reservation.startTime < :endTime')
      .andWhere('reservation.endTime > :startTime')
      .setParameter('startTime', startTime)
      .setParameter('endTime', endTime)
      .getMany();
  }

  async addReservation(args: IAddReservationWithInfo) {
    return this.save(this.create(args));
  }
}
