import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@ArgsType()
export class IdArgs {
  @IsPositive()
  @Field(() => Int)
  id: number;
}
