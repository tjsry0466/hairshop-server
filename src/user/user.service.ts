import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { saltCost } from '../auth/constant';
import { IAddUser } from './interface/add-user.interface';
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
    return this.userRepository.addUser({ ...args, password: hashedPassword });
  }
}
