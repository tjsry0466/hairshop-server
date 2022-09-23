import { registerEnumType } from '@nestjs/graphql';

export enum DesignerLevel {
  CHIEF = 'CHIEF',
  HEAD = 'HEAD',
}
registerEnumType(DesignerLevel, {
  name: 'DesignerLevel',
  description: '디자이너 레벨',
});
