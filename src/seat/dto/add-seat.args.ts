import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class AddSeatArgs {
  @IsInt()
  @Min(0)
  @Field(() => Int)
  shopId: number;

  @Min(0, { each: true })
  @Max(1, { each: true })
  @ArrayNotEmpty()
  @ArrayNotEmpty({ each: true })
  @IsArray()
  @IsArray({ each: true })
  @Field(() => [[Int]])
  seat: number[][];
}
