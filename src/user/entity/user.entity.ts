import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, nullable: true, select: false })
  password?: string;

  @Field()
  @Column({ length: 20 })
  name: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
