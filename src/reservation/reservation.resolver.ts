import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AddReservationArgs } from './dto/add-reservation.args';
import { ReservationService } from './reservation.service';

@Resolver()
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async addReservation(@Args() args: AddReservationArgs, @RequestInfo() req: Required<IRequest>) {
    return this.reservationService.addReservation({ ...args, userId: req.user.id });
  }
}
