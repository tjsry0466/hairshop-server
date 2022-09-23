import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Menu } from './menu.entity';

@ObjectType()
@Entity()
export class LengthOption {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Index('menuId')
  @Column()
  menuId: number;

  @Field({ description: '타입' })
  @Column()
  type: string;

  @Field({ description: '이름' })
  @Column()
  name: string;

  @Field(() => Int, { description: '순서' })
  @Column()
  order: number;

  @Field(() => Int, { nullable: true, description: '추가 가격' })
  @Column({ nullable: true })
  extraPrice?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Menu, (entity) => entity.lengthOptions, {
    createForeignKeyConstraints: false,
  })
  menu: Menu;
}
