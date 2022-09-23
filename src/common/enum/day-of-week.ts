import { registerEnumType } from '@nestjs/graphql';

export enum DAY_OF_WEEK {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}
registerEnumType(DAY_OF_WEEK, {
  name: 'DAY_OF_WEEK',
  description: '요일',
});
