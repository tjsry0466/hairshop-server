import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Menu } from '../../menu/entity/menu.entity';
import { Shop } from '../../shop/entity/shop.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType()
@Index('index_user_shop', ['userId', 'shopId'])
@Entity()
export class Reservation {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Index('userId')
  @Column('int', { unsigned: true })
  userId: number;

  @Field(() => Int)
  @Index('shopId')
  @Column('int', { unsigned: true })
  shopId: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  menuId: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  row: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  column: number;

  @Field()
  @Column('date')
  startTime: Date;

  @Field()
  @Column('date')
  endTime: Date;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  requireMinute: number;

  @Field()
  @Column('boolean')
  isDone: boolean;

  @Field()
  @Column('boolean')
  isCanceled: boolean;

  @Field()
  @Column('boolean')
  isDelayed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (entity) => entity.reservations, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @ManyToOne(() => Shop, (entity) => entity.reservations, {
    createForeignKeyConstraints: false,
  })
  shop: Shop;

  @ManyToOne(() => Menu, (entity) => entity.reservedMenus, {
    createForeignKeyConstraints: false,
  })
  menu: Menu;
}
