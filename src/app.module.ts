import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { isProd } from './common/constant';
import { TypeORMExceptionFilter } from './common/filter/typeorm-exception.filter';
import { DesignerModule } from './designer/designer.module';
import { SeatModule } from './seat/seat.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';

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
    UserModule,
    ShopModule,
    DesignerModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter,
    },
  ],
})
export class AppModule {}
