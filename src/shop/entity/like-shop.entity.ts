import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Shop } from './shop.entity';

@ObjectType()
@Entity()
export class LikeShop {
  @Field(() => ID, { description: '가게 좋아요 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int)
  @Column()
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
