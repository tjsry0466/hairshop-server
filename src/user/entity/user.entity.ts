import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LikeDesigner } from '../../designer/entity/like-designer.entity';
import { Review } from '../../review/entity/review.entity';
import { LikeShop } from '../../shop/entity/like-shop.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: '유저 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Field()
  @Column({ length: 20 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (entity) => entity.user, { nullable: true })
  reviews?: Review[];

  @OneToMany(() => LikeDesigner, (entity) => entity.user, { nullable: true })
  likeDesigners?: LikeDesigner[];

  @OneToMany(() => LikeShop, (entity) => entity.user, { nullable: true })
  likeShops?: LikeShop[];
}
