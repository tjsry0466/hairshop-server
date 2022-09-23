import { Module } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { DesignerResolver } from './designer.resolver';

@Module({
  providers: [DesignerResolver, DesignerService]
})
export class DesignerModule {}
