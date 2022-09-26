import { Module } from '@nestjs/common';

import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({
  providers: [ShopResolver, ShopService],
})
export class ShopModule {}
