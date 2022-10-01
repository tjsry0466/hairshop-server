import { Injectable } from '@nestjs/common';

import { Exceptions } from '../common/exceptions';
import { ShopService } from '../shop/shop.service';
import { SeatType } from './enum/seat-type.enum';
import { IAddSeat } from './interface/add-seat.interface';
import { SeatRepository } from './repository/seat.repository';

@Injectable()
export class SeatService {
  constructor(
    private readonly seatRepository: SeatRepository,
    private readonly shopService: ShopService,
  ) {}

  async addSeat(args: IAddSeat) {
    const { userId, shopId, seat } = args;
    const shop = await this.shopService.getShopById(shopId);
    if (!shop) {
      throw Exceptions.shopNotFoundError;
    }

    if (shop.ownerId !== userId) {
      throw Exceptions.notPermittedError;
    }

    this.validateSeat(seat);

    const seatInfos = this.getSeatInfo(seat);
    await this.seatRepository.addSeat({ shopId, seat, ...seatInfos });
    return true;
  }

  private validateSeat(seat: number[][]) {
    const validSeats = [SeatType.NON_SEAT, SeatType.SEAT];
    if (seat.flat().find((item) => !validSeats.includes(item))) {
      throw Exceptions.invalidAddSeatError;
    }

    const firstColumn = seat[0].length;
    const equalColumns = seat.every((item) => item.length === firstColumn);
    if (!equalColumns) {
      throw Exceptions.invalidAddSeatError;
    }
  }

  private getSeatInfo(seat: number[][]) {
    const flattedSeat = seat.flat();
    const total = flattedSeat.length;
    const nonSeatCount = flattedSeat.filter((item) => item === SeatType.NON_SEAT).length;
    const seatCount = flattedSeat.filter((item) => item === SeatType.SEAT).length;
    return { total, nonSeatCount, seatCount };
  }
}
