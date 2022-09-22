import { Injectable } from '@nestjs/common';

import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserForLogin(email: string) {
    return this.userRepository.getUserForLogin(email);
  }
}
