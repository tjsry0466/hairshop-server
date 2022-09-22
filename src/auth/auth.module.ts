import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';

import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { issuer: 'https://hairshop.kyojs.com' },
    }),
  ],
  providers: [AuthResolver, JwtStrategy],
  exports: [],
})
export class AuthModule {}
