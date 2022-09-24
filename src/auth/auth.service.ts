import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from '../common/enum';
import { Exceptions } from '../common/exceptions';
import * as request from '../common/interface/request';
import { UserService } from '../user/user.service';
import { LoginArgs, TokenOutput } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  signJsonWebToken(userId: number, role: Role) {
    const accessToken = this.jwtService.sign({ _id: userId, _role: role }, { expiresIn: '10m' });
    const refreshToken = this.jwtService.sign(
      { _id: userId, _role: role, _refresh: true },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async login(loginArgs: LoginArgs) {
    const user = await this.userService.getUserForLogin(loginArgs.email);
    if (!user) {
      throw Exceptions.userNotFoundError;
    }

    const validateResult = await bcrypt.compare(loginArgs.password, user.password);
    if (!validateResult) {
      throw Exceptions.invalidPasswordError;
    }

    return this.signJsonWebToken(user.id, Role.USER);
  }

  async loginByRefreshToken(user: request.IUser): Promise<TokenOutput> {
    return this.signJsonWebToken(user.id, user.role);
  }
}
