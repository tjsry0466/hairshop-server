import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Shop } from '../../shop/entity/shop.entity';

@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID, { description: '어드민 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '아이디' })
  @Column({ length: 100 })
  username: string;

  @Field({ description: '비밀번호' })
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Shop, (entity) => entity.owner)
  shops?: Shop[];
}
