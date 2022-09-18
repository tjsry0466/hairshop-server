@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !isProd,
      playground: !isProd,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migration/*.{ts,js}'],
        }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter,
    },
  ],
})
export class AppModule {}
