import { userData } from '../data/user.data.mock';

export const MockUserRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(userData()[0]),
  getOneByEmail: jest.fn().mockResolvedValue(userData()[0]),
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
  addUser: jest.fn().mockResolvedValue({ ...userData()[0], password: 'hashedPassword' }),
  resetPassword: jest.fn().mockResolvedValue({
    ...userData()[0],
    password: '$2a$10$GQjS9Ze/cn6Zxa2fSHlwre4BgYiIGe32HrA9x8lzX0lGcWUuSw3Ii',
  }),
});
