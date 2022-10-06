import { menuData } from '../data/menu.data.mock';

export const MockMenuService = () => ({
  getMenuById: jest.fn().mockResolvedValue(menuData()[0]),
});
