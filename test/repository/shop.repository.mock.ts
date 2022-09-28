import { shopData } from '../data/shop.data.mock';

export const MockShopRepository = () => ({
  getOneById: jest.fn().mockResolvedValue(shopData()[0]),
  addShop: jest.fn().mockResolvedValue(shopData()[0]),
});
