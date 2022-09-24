import { userData } from '../data/user.data.mock';

export const MockUserService = () => ({
  getUserForLogin: jest.fn().mockResolvedValue(userData()[0]),
});
