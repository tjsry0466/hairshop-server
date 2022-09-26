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

import { Admin } from '../../admin/entity/admin.entity';
import { DAY_OF_WEEK } from '../../common/enum/day-of-week';
import { DesignerMenu } from '../../designer/entity/designer-menu.entity';
import { Designer } from '../../designer/entity/designer.entity';
import { LikeShop } from './like-shop.entity';

@ObjectType()
@Entity()
export class Shop {
  @Field(() => ID, { description: '가게 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  ownerId: number;

  @Field({ description: '가게 이름' })
  @Column({ length: 255 })
  name: string;

  @Field({ description: '지점 이름' })
  @Column({ length: 255 })
  branchName: string;

  @Field({ defaultValue: '가게 소개' })
  @Column({ length: 255 })
  intro: string;

  @Field({ nullable: true, description: '추가정보' })
  @Column('simple-array', { nullable: true })
  additionalInfos?: string;

  @Field({ description: '가게 이미지' })
  @Column('simple-array')
  imageUrls: string;

  @Field(() => DAY_OF_WEEK, { description: '정기휴일' })
  @Column({ type: 'enum', enum: DAY_OF_WEEK })
  offDay: DAY_OF_WEEK[];

  @Field({ nullable: true, description: '위도' })
  @Column({ nullable: true })
  latitude?: number;

  @Field({ nullable: true, description: '경도' })
  @Column({ nullable: true })
  longitude?: number;

  @Field({ nullable: true, description: '찾아오시는길' })
  @Column({ nullable: true, length: 255 })
  locationDescription?: string;

  @Field({ description: '주소' })
  @Column({ length: 255 })
  address: string;

  @Field({ nullable: true, description: '안심번호' })
  @Column({ nullable: true, length: 30 })
  safeNumber?: string;

  @Field(() => Int, { description: '리뷰 개수' })
  @Column({ default: 0 })
  reviewCount: number;

  @Field({ description: '리뷰 평점' })
  @Column({ default: 0 })
  reviewRating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Admin, (entity) => entity.shops, {
    createForeignKeyConstraints: false,
  })
  owner: Admin;

  @OneToMany(() => Designer, (entity) => entity.shop, { nullable: true })
  designers?: Designer[];

  @OneToMany(() => DesignerMenu, (entity) => entity.shop)
  designerMenus?: DesignerMenu[];

  @OneToMany(() => LikeShop, (entity) => entity.shop, { nullable: true })
  likeShops?: LikeShop[];
}
