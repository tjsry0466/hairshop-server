import { Resolver } from '@nestjs/graphql';

import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}
}
