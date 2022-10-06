import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  DESIGNER = 'designer',
  USER = 'user',
}
registerEnumType(Role, { name: 'Role' });
