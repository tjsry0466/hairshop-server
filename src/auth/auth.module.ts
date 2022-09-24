import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';

import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { issuer: 'https://hairshop.kyojs.com' },
    }),
    PassportModule,
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
