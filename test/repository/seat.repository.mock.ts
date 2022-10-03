import { seatData } from '../data/seat.data.mock';

export const MockSeatRepository = () => ({
  getOneByShopId: jest.fn().mockResolvedValue(seatData()[0]),
  addSeat: jest.fn().mockResolvedValue(seatData()[0]),
});
