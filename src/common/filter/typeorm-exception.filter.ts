import { ArgumentsHost, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

import { isProd } from '../constant';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    if (isProd) {
      throw new InternalServerErrorException('DB 에러가 발생했습니다.');
    }

    return exception;
  }
}
