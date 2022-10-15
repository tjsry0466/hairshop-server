export interface IReservationInfo {
  shopId: number;
  menuId: number;
  row: number;
  column: number;
  reservationDate: string;
  startTime: Date;
  endTime: Date;
}
