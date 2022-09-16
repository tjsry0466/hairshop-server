import { InternalServerErrorException } from '@nestjs/common';

import { ErrorMessages as Error } from './error-messages';

export class Exceptions {
  static readonly fallback = new InternalServerErrorException(Error.default);
}
