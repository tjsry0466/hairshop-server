export interface IAddReservation {
  userId: number;
  shopId: number;
  menuId: number;
  row: number;
  column: number;
  startTime: Date;
  requireMinute: number;
}
