import { Resolver } from '@nestjs/graphql';

import { ReservationService } from './reservation.service';

@Resolver()
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}
}
