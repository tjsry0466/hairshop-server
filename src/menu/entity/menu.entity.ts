import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Gender } from '../../common/enum/gender';
import { DesignerMenu } from '../../designer/entity/designer-menu.entity';
import { Review } from '../../review/entity/review.entity';
import { LengthOption } from './length-option.entity';

@ObjectType()
@Entity()
export class Menu {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Index('shopId')
  @Column()
  shopId: number;

  @Field({ description: '커트 포함 옵션' })
  @Column({ default: false })
  includeCutOption: boolean;

  @Field({ description: '샴푸 포함 옵션' })
  @Column({ default: false })
  includeShampooOption: boolean;

  @Field({ nullable: true, description: '설명' })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true, description: '할인률' })
  @Column({ nullable: true })
  discountRate?: number;

  @Field(() => Int, { nullable: true, description: '시술 소요 시간' })
  @Column({ nullable: true })
  requireMinute?: number;

  @Field(() => Gender, { nullable: true, description: '성별' })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Field({ nullable: true, description: '시술 이미지' })
  @Column('simple-array', { nullable: true })
  imagesUrls?: string;

  @Field(() => Int, { description: '기본 가격' })
  @Column()
  normalPrice: number;

  @Field(() => Int, { description: '할인 가격' })
  @Column()
  salesPrice: number;

  @Field(() => Int, { description: '좋아요 개수' })
  @Column({ default: 0 })
  likeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (entity) => entity.menu)
  reviews?: Review[];

  @OneToMany(() => LengthOption, (entity) => entity.menu)
  lengthOptions?: LengthOption[];

  @OneToMany(() => DesignerMenu, (entity) => entity.menu)
  designerMenus?: DesignerMenu[];
}
