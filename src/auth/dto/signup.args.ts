import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Role } from '../../common/enum';

@ArgsType()
export class SignupArgs {
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsEnum(Role)
  @Field(() => Role)
  role: Role;
}
