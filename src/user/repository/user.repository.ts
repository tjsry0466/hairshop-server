import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { IAddUser } from '../interface/add-user.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getOneByEmail(email: string) {
    return this.findOne({ email });
  }

  async getUserForLogin(email: string): Promise<Pick<User, 'id' | 'password'> | undefined> {
    return this.createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async addUser(args: IAddUser) {
    return this.save(this.create(args));
  }
}
