import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class ShopIdArgs {
  @IsInt()
  @Min(1)
  @Field(() => Int)
  shopId: number;
}
