import { shopData } from '../data/shop.data.mock';

export const MockShopRepository = () => ({
  addShop: jest.fn().mockResolvedValue(shopData()[0]),
});
