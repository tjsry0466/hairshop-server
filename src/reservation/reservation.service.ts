import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { Exceptions } from '../common/exceptions';
import { MenuService } from '../menu/menu.service';
import { ShopService } from '../shop/shop.service';
import { IAddReservation } from './interface/add-reservation.interface';
import { IReservationInfo } from './interface/date-range.interface';
import { ReservationRepository } from './repository/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly shopService: ShopService,
    private readonly menuService: MenuService,
  ) {}

  async getReservationByInfo(args: IReservationInfo) {
    return this.reservationRepository.getOneByReservationInfo(args);
  }

  async addReservation(args: IAddReservation) {
    const { shopId, menuId, startTime, row, column, requireMinute } = args;

    const shop = await this.shopService.getShopById(shopId);
    if (!shop) {
      throw Exceptions.shopNotFoundError;
    }

    const menu = await this.menuService.getMenuById(menuId);
    if (!menu) {
      throw Exceptions.menuNotFoundError;
    }

    const reservationDate = dayjs(args.startTime).format('YYYY-MM-DD');
    const endTime = dayjs(args.startTime).add(requireMinute, 'minute').toDate();

    const reservations = await this.getReservationByInfo({
      shopId,
      menuId,
      row,
      column,
      reservationDate,
      startTime,
      endTime,
    });
    if (reservations.length > 0) {
      throw Exceptions.alreadyReservedError;
    }

    await this.reservationRepository.addReservation({
      ...args,
      endTime,
      reservationDate,
    });
    return true;
  }
}
