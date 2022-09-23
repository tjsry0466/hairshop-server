import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../user/entity/user.entity';
import { Designer } from './designer.entity';

@ObjectType()
@Entity()
export class LikeDesigner {
  @Field(() => ID, { description: '디자이너 좋아요 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => Int)
  @Column()
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
