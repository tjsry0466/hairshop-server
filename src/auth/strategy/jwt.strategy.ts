import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Role } from '../../common/enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    if (payload._refresh) {
      return {
        id: payload._id,
        role: payload._role ?? Role.USER,
        refresh: true,
        exp: payload.exp,
      };
    }

    return { id: payload._id, role: payload._role, exp: payload.exp };
  }
}
