import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Menu } from '../../menu/entity/menu.entity';
import { Shop } from '../../shop/entity/shop.entity';
import { Designer } from './designer.entity';

@ObjectType()
@Unique('unique_shop_designer_menu', ['shopId', 'designerId', 'menuId'])
@Entity()
export class DesignerMenu {
  @Field(() => ID, { description: '디자이너 메뉴 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Index('shopId')
  @Field(() => Int)
  @Column('int', { unsigned: true })
  shopId: number;

  @Index('designerMenu')
  @Field(() => Int)
  @Column('int', { unsigned: true })
  designerId: number;

  @Field(() => Int)
  @Column('int', { unsigned: true })
  menuId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Shop, (entity) => entity.designerMenus, {
    createForeignKeyConstraints: false,
  })
  shop: Shop;

  @ManyToOne(() => Designer, (entity) => entity.designerMenus, {
    createForeignKeyConstraints: false,
  })
  designer: Designer;

  @ManyToOne(() => Menu, (entity) => entity.designerMenus, {
    createForeignKeyConstraints: false,
  })
  menu: Menu;
}
