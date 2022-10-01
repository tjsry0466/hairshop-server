import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { AddSeatArgs } from './dto/add-seat.args';
import { SeatService } from './seat.service';

@Resolver()
export class SeatResolver {
  constructor(private readonly seatService: SeatService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async addSeat(@Args() args: AddSeatArgs) {
    return this.seatService.addSeat(args);
  }
}
