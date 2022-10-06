import { menuData } from '../data/menu.data.mock';

export const MockMenuRepository = () => ({
  addMenu: jest.fn().mockResolvedValue(menuData()[0]),
});
