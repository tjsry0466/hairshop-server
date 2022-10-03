import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface';
import { AddSeatArgs } from './dto/add-seat.args';
import { ShopIdArgs } from './dto/shop-id.args';
import { Seat } from './entity/seat.entity';
import { SeatService } from './seat.service';

@Resolver()
export class SeatResolver {
  constructor(private readonly seatService: SeatService) {}

  @Query(() => Seat)
  async seat(@Args() args: ShopIdArgs) {
    return this.seatService.getSeatByShopId(args.shopId);
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean)
  async addSeat(@Args() args: AddSeatArgs, @RequestInfo() req: Required<IRequest>) {
    return this.seatService.addSeat({ ...args, userId: req.user.id });
  }
}
