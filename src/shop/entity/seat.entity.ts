import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Shop } from './shop.entity';

@ObjectType()
@Entity()
export class Seat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Index('shopId')
  @Column('int', { unsigned: true })
  shopId: number;

  @Field()
  @Column('text')
  seat: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Shop, (entity) => entity.seat, {
    createForeignKeyConstraints: false,
  })
  shop: Shop;
}
