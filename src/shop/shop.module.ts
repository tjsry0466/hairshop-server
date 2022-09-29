import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopRepository } from './repository/shop.repository';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  providers: [ShopResolver, ShopService],
  exports: [ShopService],
})
export class ShopModule {}
