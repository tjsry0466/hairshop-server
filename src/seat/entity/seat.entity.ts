import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Shop } from '../../shop/entity/shop.entity';

@ObjectType()
@Unique('unique_shopId', ['shopId'])
@Entity()
export class Seat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  shopId: number;

  @Field(() => Int)
  @Column('int', { default: 0, unsigned: true })
  total: number;

  @Field(() => GraphQLJSON)
  @Column({ type: 'json' })
  seat: number[][];

  @Field(() => Int)
  @Column('int', { default: 0, unsigned: true })
  seatCount: number;

  @Field(() => Int)
  @Column('int', { default: 0, unsigned: true })
  nonSeatCount: number;

  @Field(() => Int)
  @Column('int', { default: 0, unsigned: true })
  unavailableCount: number;

  @Field(() => Int)
  @Column('int', { default: 0, unsigned: true })
  reservedCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Shop, (entity) => entity.seat, {
    createForeignKeyConstraints: false,
  })
  shop: Shop;
}
