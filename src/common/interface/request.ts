import { Role } from '../enum';

export type User = {
  id: number;
  role: Role;
  exp: number;
  refresh?: boolean;
};

export interface IRequest {
  user?: string; // FIXME: 유저 엔티티 작성 후에 변경 필요
  ip: string;
  userAgent: string;
}
