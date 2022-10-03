import { shopData } from '../data/shop.data.mock';

export const MockShopService = () => ({
  getShopById: jest.fn().mockResolvedValue(shopData()[0]),
});
