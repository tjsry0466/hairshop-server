import { IAddSeat } from '../../interface/add-seat.interface';

export interface IAddSeatWithInfo extends IAddSeat {
  total: number;
  nonSeatCount: number;
  seatCount: number;
  reservedCount: number;
  unavailableCount: number;
}
