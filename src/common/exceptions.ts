import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ErrorMessages } from './error-messages';

export class Exceptions {
  static readonly emailAlreadyExistsError = new BadRequestException(
    ErrorMessages.emailAlreadyExistsErrorMessage,
  );

  static readonly fallback = new InternalServerErrorException(ErrorMessages.default);
  static readonly userNotFoundError = new NotFoundException(ErrorMessages.userNotFoundMessage);
  static readonly shopNotFoundError = new NotFoundException(ErrorMessages.shopNotFoundMessage);
  static readonly invalidPasswordError = new ForbiddenException(
    ErrorMessages.invalidPasswordErrorMessage,
  );
}
