import { userData } from '../data/user.data.mock';

export const MockUserRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(userData()[1]),
  getOneByEmail: jest.fn().mockResolvedValue(userData()[0]),
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
  addUser: jest.fn().mockResolvedValue({ ...userData()[0], password: 'hashedPassword' }),
  resetPassword: jest.fn().mockResolvedValue({
    affected: 1,
  }),
  withdrawUser: jest.fn().mockResolvedValue({
    affected: 1,
  }),
});
