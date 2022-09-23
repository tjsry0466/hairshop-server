import { Resolver } from '@nestjs/graphql';
import { ShopService } from './shop.service';

@Resolver()
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}
}
