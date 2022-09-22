import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserForLogin(email: string): Promise<Pick<User, 'id' | 'password'> | undefined> {
    return this.createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }
}
