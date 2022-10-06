export interface IAddReservationWithInfo {
  userId: number;
  shopId: number;
  menuId: number;
  row: number;
  column: number;
  reservationDate: string;
  startTime: Date;
  endTime: Date;
  estimatedMinutes: number;
}
