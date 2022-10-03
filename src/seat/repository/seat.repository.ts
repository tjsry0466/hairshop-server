import { EntityRepository, Repository } from 'typeorm';

import { Seat } from '../entity/seat.entity';
import { IAddSeatWithInfo } from './interface/add-seat-with-info.interface';

@EntityRepository(Seat)
export class SeatRepository extends Repository<Seat> {
  async addSeat(args: IAddSeatWithInfo) {
    return this.save(this.create(args));
  }
}
