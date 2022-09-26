import { userData } from '../data/user.data.mock';

export const MockUserService = () => ({
  getUserByEmail: jest.fn().mockResolvedValue(userData()[0]),
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
  addUser: jest.fn().mockResolvedValue({ ...userData()[0], password: 'hashedPassword' }),
});
