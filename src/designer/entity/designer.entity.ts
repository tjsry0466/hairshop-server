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
  UpdateDateColumn,
} from 'typeorm';

import { DAY_OF_WEEK } from '../../common/enum/day-of-week';
import { ReviewComment } from '../../review-comment/entity/review-comment.entity';
import { Review } from '../../review/entity/review.entity';
import { Shop } from '../../shop/entity/shop.entity';
import { DesignerLevel } from '../enum/level';
import { DesignerMenu } from './designer-menu.entity';
import { LikeDesigner } from './like-designer.entity';

@ObjectType()
@Entity()
export class Designer {
  @Field(() => ID, { description: '디자이너 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email')
  @Field({ description: '이메일' })
  @Column({ length: 255 })
  email: string;

  @Field({ description: '비밀번호' })
  @Column()
  password: string;

  @Index('shopId')
  @Field(() => Int, { nullable: true, description: '근무하는 가게 id' })
  @Column({ nullable: true, unsigned: true })
  shopId?: number;

  @Field({ defaultValue: '닉네임' })
  @Column({ length: 100 })
  nickname: string;

  @Field(() => DesignerLevel, { description: '직급' })
  @Column({ type: 'enum', enum: DesignerLevel })
  level: DesignerLevel;

  @Field({ description: '프로필 사진' })
  @Column({ length: 255 })
  profileUrl: string;

  @Field({ nullable: true, description: '썸네일 프로필 사진' })
  @Column({ length: 255, nullable: true })
  thumbnailProfileUrl?: string;

  @Field({ nullable: true, description: '짧은 소개' })
  @Column({ length: 100 })
  shortIntro: string;

  @Field({ nullable: true, description: '소개' })
  @Column({ nullable: true, length: 255 })
  longIntro?: string;

  @Field(() => Int, { description: '근속년차' })
  @Column({ default: 1, unsigned: true })
  careerYear: number;

  @Field(() => DAY_OF_WEEK, { description: '정기 휴무 요일' })
  @Column({ type: 'enum', enum: DAY_OF_WEEK })
  regularHoliday: DAY_OF_WEEK[];

  @Field(() => Int, { description: '스타일 개수' })
  @Column({ default: 0, unsigned: true })
  styleCount: number;

  @Field(() => Int, { description: '좋아요 개수' })
  @Column({ default: 0, unsigned: true })
  likeCount: number;

  @Field(() => Int, { description: '리뷰 개수' })
  @Column({ default: 0, unsigned: true })
  reviewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Shop, (entity) => entity.designers, {
    createForeignKeyConstraints: false,
  })
  shop?: Shop;

  @OneToMany(() => Review, (entity) => entity.designer)
  reviews?: Review[];

  @OneToMany(() => ReviewComment, (entity) => entity.designer, { nullable: true })
  comments?: ReviewComment[];

  @OneToMany(() => DesignerMenu, (entity) => entity.designer)
  designerMenus?: DesignerMenu[];

  @OneToMany(() => LikeDesigner, (entity) => entity.designer, { nullable: true })
  likeDesigners?: LikeDesigner[];
}
