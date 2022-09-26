import { Resolver } from '@nestjs/graphql';

import { DesignerService } from './designer.service';

@Resolver()
export class DesignerResolver {
  constructor(private readonly designerService: DesignerService) {}
}
