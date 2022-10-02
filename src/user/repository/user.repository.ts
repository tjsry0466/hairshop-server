import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { IAddUser } from '../interface/add-user.interface';
import { IResetPassword } from '../interface/reset-password.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getOneById(id: number) {
    return this.findOne(id);
  }

  async getOneByEmail(email: string) {
    return this.findOne({ email });
  }

  async getUserForLogin(
    email: string,
  ): Promise<Pick<User, 'id' | 'password' | 'role'> | undefined> {
    return this.createQueryBuilder('user')
      .select(['user.id', 'user.role'])
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async addUser(args: IAddUser) {
    return this.save(this.create(args));
  }

  async resetPassword(args: IResetPassword) {
    return await this.update({ id: args.userId }, { password: args.newPassword });
  }
}
