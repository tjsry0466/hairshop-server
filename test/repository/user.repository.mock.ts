import { userData } from '../data/user.data.mock';

export const MockUserRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(userData()[1]),
  getOneByEmail: jest.fn().mockResolvedValue(userData()[0]),
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
  addUser: jest.fn().mockResolvedValue({ ...userData()[0], password: 'hashedPassword' }),
  resetPassword: jest.fn().mockResolvedValue({
    ...userData()[1],
    password: '$2a$10$ymqqlTu914LsYh0ElWca7.n07Bo.s1r7RF5RRDufR9SWE.dc3y9gi',
  }),
});
