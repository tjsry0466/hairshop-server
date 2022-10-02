import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@ArgsType()
export class ResetPasswordArgs {
  @Field()
  @IsInt()
  @Min(1)
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
