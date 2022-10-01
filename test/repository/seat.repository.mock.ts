import { seatData } from '../data/seat.data.mock';

export const MockSeatRepository = () => ({
  addSeat: jest.fn().mockResolvedValue(seatData()[0]),
});
