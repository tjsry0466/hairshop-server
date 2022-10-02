import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { saltCost } from '../auth/constant';
import { ErrorMessages } from '../common/error-messages';
import { IAddUser } from './interface/add-user.interface';
import { IResetPassword } from './interface/reset-password.interface';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async getUserById(id: number) {
    return this.userRepository.getOneById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }

  async getUserForLogin(email: string) {
    return this.userRepository.getUserForLogin(email);
  }

  async addUser(args: IAddUser) {
    const hashedPassword = await bcrypt.hash(args.password, saltCost);
    return this.userRepository.addUser({ ...args, password: hashedPassword });
  }

  async resetPassword(args: IResetPassword) {
    const { userId, password, newPassword } = args;
    const user = await this.userRepository.getOneById(userId);
    if (!user) {
      return new Error(ErrorMessages.userNotFoundMessage);
    }

    const isPasswordMatching = await bcrypt.compare(password ?? '', user?.password);

    if (!isPasswordMatching) {
      return new Error(ErrorMessages.invalidPasswordErrorMessage);
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltCost);
    const result = await this.userRepository.resetPassword({
      userId,
      newPassword: hashedPassword,
    });
    return true;
  }
}
