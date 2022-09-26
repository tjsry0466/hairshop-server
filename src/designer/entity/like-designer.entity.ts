import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Designer } from './designer.entity';

@ObjectType()
@Unique('unique_user_designer', ['userId', 'designerId'])
@Entity()
export class LikeDesigner {
  @Field(() => ID, { description: '디자이너 좋아요 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  userId: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  designerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.likeDesigners, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @ManyToOne(() => Designer, (entity) => entity.likeDesigners, {
    createForeignKeyConstraints: false,
  })
  designer: Designer;
}
