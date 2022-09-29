import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsInt, Min } from 'class-validator';

@ArgsType()
export class AddSeatArgs {
  @IsInt()
  @Min(0)
  @Field(() => Int)
  shopId: number;

  @IsArray()
  @Field(() => [[Int]])
  seat: number[][];
}
