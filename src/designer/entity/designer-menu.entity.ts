import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Menu } from '../../menu/entity/menu.entity';
import { Shop } from '../../shop/entity/shop.entity';
import { Designer } from './designer.entity';

@ObjectType()
@Entity()
export class DesignerMenu {
  @Field(() => ID, { description: '디자이너 메뉴 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  shopId: number;

  @Field(() => Int)
  @Column()
  designerId: number;

  @Field(() => Int)
  @Column()
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
