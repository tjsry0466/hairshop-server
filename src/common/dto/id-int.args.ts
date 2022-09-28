import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class IdIntArgs {
  @IsInt()
  @Min(1)
  @Field(() => Int)
  id: number;
}
