import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { saltCost } from '../auth/constant';
import { Exceptions } from '../common/exceptions';
import * as request from '../common/interface/request';
import { IAddUser } from './interface/add-user.interface';
import { IResetPassword } from './interface/reset-password.interface';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const result = await this.userRepository.addUser({ ...args, password: hashedPassword });
    return result;
  }

  async resetPassword(args: IResetPassword, user: request.IUser) {
    const { password, newPassword } = args;
    const isUser = await this.userRepository.getOneById(user.id);
    if (!isUser) {
      throw Exceptions.userNotFoundError;
    }

    const isPasswordMatching = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatching) {
      throw Exceptions.invalidPasswordError;
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltCost);
    await this.userRepository.resetPassword(user.id, hashedPassword);

    return true;
  }

  async withdrawUser(id: number, user: request.IUser) {
    const isUser = await this.userRepository.getOneById(id);
    if (!isUser) {
      throw Exceptions.userNotFoundError;
    }

    if (user.role !== 'admin' && user.id !== id) {
      throw Exceptions.notPermittedError;
    }

    const { affected } = await this.userRepository.withdrawUser(id);

    return typeof affected === 'number' ? affected > 0 : false;
  }
}
