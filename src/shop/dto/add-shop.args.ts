import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { DAY_OF_WEEK } from '../../common/enum/day-of-week';

@ArgsType()
export class AddShopArgs {
  @IsInt()
  @Field(() => Int)
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  branchName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  intro: string;

  @ArrayUnique()
  @IsString({ each: true })
  @Field(() => [String])
  imageUrls: string[];

  @ArrayUnique()
  @IsEnum(DAY_OF_WEEK, { each: true })
  @Field(() => DAY_OF_WEEK)
  offDay: DAY_OF_WEEK[];

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  longitude?: number;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  additionalInfos?: string[];

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  locationDescription?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  safeNumber?: string;
}
