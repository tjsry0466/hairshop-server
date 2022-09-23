import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Designer } from '../../designer/entity/designer.entity';
import { Review } from '../../review/entity/review.entity';

@ObjectType()
@Entity()
export class ReviewComment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  reviewId: number;

  @Field(() => Int)
  @Column()
  designerId: number;

  @Field()
  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Review, (entity) => entity.comments, {
    createForeignKeyConstraints: false,
  })
  review: Review;

  @ManyToOne(() => Designer, (entity) => entity.comments, {
    createForeignKeyConstraints: false,
  })
  designer: Designer;
}
