import { Module } from '@nestjs/common';

import { DesignerResolver } from './designer.resolver';
import { DesignerService } from './designer.service';

@Module({
  providers: [DesignerResolver, DesignerService],
})
export class DesignerModule {}
