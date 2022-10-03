import { Role } from '../../common/enum';

export interface IAddUser {
  email: string;
  password: string;
  name: string;
  role: Role;
}
