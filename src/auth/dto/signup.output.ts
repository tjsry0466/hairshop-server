import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/entity/user.entity';
import { TokenOutput } from './token.output';

@ObjectType()
export class SignupOutput extends TokenOutput {
  @Field(() => User)
  user: User;
}
