import { Test, TestingModule } from '@nestjs/testing';

import { MockMenuRepository } from '../../test/repository/menu.repository.mock';
import { MockShopService } from '../../test/service/shop.service.mock';
import { Gender } from '../common/enum/gender';
import { Exceptions } from '../common/exceptions';
import { ShopService } from '../shop/shop.service';
import { MenuService } from './menu.service';
import { MenuRepository } from './repository/menu.repository';

describe('MenuService', () => {
  let service: MenuService;
  let shopService: ShopService;
  let menuRepository: MenuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: ShopService,
          useValue: MockShopService(),
        },
        {
          provide: MenuRepository,
          useValue: MockMenuRepository(),
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
    shopService = module.get<ShopService>(ShopService);
    menuRepository = module.get<MenuRepository>(MenuRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addMenu', () => {
    it('normal case', async () => {
      // given
      const args = {
        userId: 1,
        shopId: 1,
        name: '시술 1',
        includeCutOption: true,
        includeShampooOption: true,
        price: 10000,
        estimatedMinutes: 20,
        description: '아주 좋아요 !',
        discountRate: 20,
        gender: Gender.MALE,
        imageUrls: ['https://naver.com/image'],
      };

      // when
      const result = await service.addMenu(args);

      // then
      const priceInfo = { normalPrice: args.price, salesPrice: 8000 };
      expect(result).toBe(true);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(args.shopId);
      expect(menuRepository.addMenu).toBeCalledTimes(1);
      expect(menuRepository.addMenu).toBeCalledWith({
        shopId: 1,
        name: '시술 1',
        includeCutOption: true,
        includeShampooOption: true,
        estimatedMinutes: 20,
        description: '아주 좋아요 !',
        discountRate: 20,
        gender: Gender.MALE,
        imageUrls: ['https://naver.com/image'],
        ...priceInfo,
      });
    });

    it('샵이 존재하지 않는 경우', async () => {
      // given
      jest.spyOn(shopService, 'getShopById').mockResolvedValue(undefined);
      const args = {
        userId: 1,
        shopId: 1,
        name: '시술 1',
        includeCutOption: true,
        includeShampooOption: true,
        price: 10000,
        estimatedMinutes: 20,
        description: '아주 좋아요 !',
        discountRate: 20,
        gender: Gender.MALE,
        imageUrls: ['https://naver.com/image'],
      };

      // when
      await expect(service.addMenu(args)).rejects.toThrow(Exceptions.shopNotFoundError);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(args.shopId);
      expect(menuRepository.addMenu).not.toBeCalled();
    });

    it('샵이 소유주가 아닌 경우', async () => {
      // given
      const args = {
        userId: 9999,
        shopId: 1,
        name: '시술 1',
        includeCutOption: true,
        includeShampooOption: true,
        price: 10000,
        estimatedMinutes: 20,
        description: '아주 좋아요 !',
        discountRate: 20,
        gender: Gender.MALE,
        imageUrls: ['https://naver.com/image'],
      };

      // when
      await expect(service.addMenu(args)).rejects.toThrow(Exceptions.notPermittedError);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(args.shopId);
      expect(menuRepository.addMenu).not.toBeCalled();
    });
  });
});
