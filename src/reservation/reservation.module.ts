import { Module } from '@nestjs/common';

import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

@Module({
  providers: [ReservationResolver, ReservationService],
})
export class ReservationModule {}
