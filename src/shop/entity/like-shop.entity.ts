import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Shop } from './shop.entity';

@ObjectType()
@Unique('unique_user_like_shop', ['userId', 'shopId'])
@Entity()
export class LikeShop {
  @Field(() => ID, { description: '가게 좋아요 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  userId: number;

  @Index('shopId')
  @Field(() => Int)
  @Column('int', { unsigned: true })
  shopId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.likeShops, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @ManyToOne(() => Shop, (entity) => entity.likeShops, {
    createForeignKeyConstraints: false,
  })
  shop: Shop;
}
