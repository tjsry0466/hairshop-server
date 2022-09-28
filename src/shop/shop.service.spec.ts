import { Test, TestingModule } from '@nestjs/testing';

import { shopData } from '../../test/data/shop.data.mock';
import { userData } from '../../test/data/user.data.mock';
import { MockShopRepository } from '../../test/repository/shop.repository.mock';
import { DAY_OF_WEEK } from '../common/enum/day-of-week';
import { ShopRepository } from './repository/shop.repository';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;
  let shopRepository: ShopRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: ShopRepository,
          useValue: MockShopRepository(),
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    shopRepository = module.get<ShopRepository>(ShopRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getShopById()', () => {
    it('normal case', async () => {
      // given
      const id = 1;

      // when
      const result = await service.getShopById(id);

      // then
      expect(result).toEqual(shopData()[0]);
      expect(shopRepository.getOneById).toBeCalledTimes(1);
      expect(shopRepository.getOneById).toBeCalledWith(id);
    });
  });

  describe('addShop()', () => {
    it('normal case', async () => {
      // given
      const args = {
        ownerId: userData()[0].id,
        name: '피릿가게',
        branchName: '서울역지점',
        intro: '반갑습니다 ^^.',
        imageUrls: ['https://naver.com/image'],
        offDay: [DAY_OF_WEEK.MONDAY],
        address: '서울특별시 관악구',
        latitude: 53.23232,
        longitude: 35.63443,
        additionalInfos: ['알바생 이쁨'],
        locationDescription: '거기 골목 옆에서 좀 들어오면 있어요.',
        safeNumber: '0505-1111-2222',
      };
      // when
      const result = await service.addShop(args);

      // then
      expect(result).toEqual(true);
      expect(shopRepository.addShop).toBeCalledTimes(1);
      expect(shopRepository.addShop).toBeCalledWith(args);
    });
  });
});
