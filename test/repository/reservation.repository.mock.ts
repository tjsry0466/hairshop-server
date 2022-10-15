export const MockReservationRepository = () => ({
  getOneByReservationInfo: jest.fn().mockResolvedValue([]),
  addReservation: jest.fn().mockResolvedValue(undefined),
});
