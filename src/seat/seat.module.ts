import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopModule } from '../shop/shop.module';
import { SeatRepository } from './repository/seat.repository';
import { SeatResolver } from './seat.resolver';
import { SeatService } from './seat.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatRepository]), ShopModule],
  providers: [SeatResolver, SeatService],
  exports: [SeatService],
})
export class SeatModule {}
