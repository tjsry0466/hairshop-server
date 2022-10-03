import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopModule } from '../shop/shop.module';
import { MenuResolver } from './menu.resolver';
import { MenuService } from './menu.service';
import { MenuRepository } from './repository/menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository]), ShopModule],
  providers: [MenuResolver, MenuService],
  exports: [MenuService],
})
export class MenuModule {}
