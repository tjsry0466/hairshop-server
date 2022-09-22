import { Role } from '../enum';

export type IUser = {
  id: number;
  role: Role;
  exp: number;
  refresh?: boolean;
};

export interface IRequest {
  user?: IUser;
  ip: string;
  userAgent: string;
}
