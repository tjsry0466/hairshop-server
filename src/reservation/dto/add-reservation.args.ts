import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, Min } from 'class-validator';

@ArgsType()
export class AddReservationArgs {
  @IsInt()
  @Min(1)
  @Field(() => Int)
  shopId: number;

  @IsInt()
  @Min(1)
  @Field(() => Int)
  menuId: number;

  @IsInt()
  @Min(0)
  @Field(() => Int)
  row: number;

  @IsInt()
  @Min(0)
  @Field(() => Int)
  column: number;

  @IsDate()
  @Field()
  startTime: Date;

  @IsInt()
  @Min(1)
  @Field(() => Int)
  estimatedMinutes: number;
}
