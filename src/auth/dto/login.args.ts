import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @IsEmail({}, { message: '이메일 형식이어야 합니다.' })
  @IsNotEmpty({ message: '이메일은 필수입니다.' })
  @MaxLength(100, { message: '이메일은 100 글자 이하여야 합니다.' })
  @Field()
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MaxLength(250, { message: '비밀번호는 250 글자 이하여야 합니다.' })
  @Field()
  password: string;
}
