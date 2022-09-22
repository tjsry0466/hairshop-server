import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';

import { ErrorMessages as Error, ErrorMessages } from './error-messages';

export class Exceptions {
  static readonly fallback = new InternalServerErrorException(Error.default);
  static readonly userNotFoundError = new NotFoundException(ErrorMessages.userNotFoundMessage);
  static readonly invalidPasswordError = new ForbiddenException(
    ErrorMessages.invalidPasswordErrorMessage,
  );
}
