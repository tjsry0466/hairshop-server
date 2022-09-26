import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Designer } from '../../designer/entity/designer.entity';
import { Menu } from '../../menu/entity/menu.entity';
import { ReviewComment } from '../../review-comment/entity/review-comment.entity';
import { User } from '../../user/entity/user.entity';

@ObjectType()
@Unique('unique_author_menu_designer', ['authorId', 'menuId', 'designerId'])
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Index('authorId')
  @Field(() => Int, { description: '작성자 id' })
  @Column('int', { unsigned: true })
  authorId: number;

  @Index('menuId')
  @Field(() => Int, { description: '시술 id' })
  @Column('int', { unsigned: true })
  menuId: number;

  @Index('designerId')
  @Field(() => Int, { description: '디자이너 id' })
  @Column('int', { unsigned: true })
  designerId: number;

  @Field({ description: '내용' })
  @Column({ type: 'text' })
  content: string;

  @Field(() => Int, { description: '별점' })
  @Column('int', { unsigned: true })
  star: number;

  @Field(() => Int, { nullable: true })
  @Column('int', { unsigned: true, nullable: true })
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
