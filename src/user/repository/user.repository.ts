import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { IAddUser } from '../interface/add-user.interface';

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

  async resetPassword(id: number, password: string) {
    return this.createQueryBuilder().update().set({ password }).where('id = :id', { id }).execute();
  }

  async deleteUser(id: number) {
    return this.softDelete(id);
  }
}
