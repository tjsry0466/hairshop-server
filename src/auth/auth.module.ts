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
