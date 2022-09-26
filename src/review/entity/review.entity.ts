import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Designer } from '../../designer/entity/designer.entity';
import { Menu } from '../../menu/entity/menu.entity';
import { ReviewComment } from '../../review-comment/entity/review-comment.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '작성자 id' })
  @Column()
  authorId: number;

  @Field(() => Int, { description: '시술 id' })
  @Column()
  menuId: number;

  @Field(() => Int, { description: '디자이너 id' })
  @Column()
  designerId: number;

  @Field({ description: '내용' })
  @Column({ type: 'text' })
  content: string;

  @Field(() => Int, { description: '별점' })
  @Column()
  star: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  visitCount?: number;

  @Field({ nullable: true })
  @Column('simple-array', { nullable: true })
  photoUrls?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (entity) => entity.reviews, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @ManyToOne(() => Menu, (entity) => entity.reviews, {
    createForeignKeyConstraints: false,
  })
  menu: Menu;

  @ManyToOne(() => Designer, (entity) => entity.reviews, {
    createForeignKeyConstraints: false,
  })
  designer: Designer;

  @OneToMany(() => ReviewComment, (entity) => entity.review, { nullable: true })
  comments?: ReviewComment[];
}
