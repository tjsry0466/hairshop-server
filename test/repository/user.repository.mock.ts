import { userData } from '../data/user.data.mock';

export const MockUserRepository = () => ({
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
});
