import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { Gender } from '../../common/enum/gender';

@ArgsType()
export class AddMenuArgs {
  @IsInt()
  @Min(1)
  @Field(() => Int)
  shopId: number;

  @IsString()
  @Field()
  name: string;

  @IsBoolean()
  @Field()
  includeCutOption: boolean;

  @IsBoolean()
  @Field()
  includeShampooOption: boolean;

  @IsInt()
  @Field(() => Int)
  price: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  discountRate?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  requireMinute?: number;

  @IsOptional()
  @IsEnum(Gender)
  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  imageUrls?: string[];
}
