import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@ArgsType()
export class ResetPasswordArgs {
  @IsInt()
  @Min(1)
  @Field()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  newPassword: string;
}
