import { Test, TestingModule } from '@nestjs/testing';

import { seatData } from '../../test/data/seat.data.mock';
import { MockSeatRepository } from '../../test/repository/seat.repository.mock';
import { MockShopService } from '../../test/service/shop.service.mock';
import { Exceptions } from '../common/exceptions';
import { ShopService } from '../shop/shop.service';
import { SeatRepository } from './repository/seat.repository';
import { SeatService } from './seat.service';

describe('SeatService', () => {
  let service: SeatService;
  let shopService: ShopService;
  let seatRepository: SeatRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatService,
        {
          provide: ShopService,
          useValue: MockShopService(),
        },
        {
          provide: SeatRepository,
          useValue: MockSeatRepository(),
        },
      ],
    }).compile();

    service = module.get<SeatService>(SeatService);
    shopService = module.get<ShopService>(ShopService);
    seatRepository = module.get<SeatRepository>(SeatRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSeatByShopId', () => {
    it('normal case', async () => {
      // given
      const shopId = 1;

      // when
      const result = await service.getSeatByShopId(shopId);

      // then
      expect(result).toEqual(seatData()[0]);
      expect(seatRepository.getOneByShopId).toBeCalledTimes(1);
      expect(seatRepository.getOneByShopId).toBeCalledWith(shopId);
    });
  });

  describe('addSeat', () => {
    it('normal case', async () => {
      // given
      const userId = 1;
      const shopId = 1;
      const seat = [
        [0, 1],
        [1, 1],
      ];

      // when
      const result = await service.addSeat({ userId, shopId, seat });

      // then
      const total = 4;
      const nonSeatCount = 1;
      const seatCount = 3;
      expect(result).toEqual(true);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(seatRepository.addSeat).toBeCalledTimes(1);
      expect(seatRepository.addSeat).toBeCalledWith({
        shopId,
        seat,
        total,
        nonSeatCount,
        seatCount,
      });
    });

    it('샵이 존재하지 않는 경우', async () => {
      // given
      jest.spyOn(shopService, 'getShopById').mockResolvedValue(undefined);
      const userId = 1;
      const shopId = 1;
      const seat = [
        [0, 1],
        [1, 1],
      ];

      // when
      await expect(service.addSeat({ userId, shopId, seat })).rejects.toThrow(
        Exceptions.shopNotFoundError,
      );
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(seatRepository.addSeat).not.toBeCalled();
    });

    it('입력된 정보가 올바르지 않은 경우', async () => {
      // given
      const userId = 1;
      const shopId = 1;
      const seat = [
        [0, 1],
        [1, 2],
      ];

      // when
      await expect(service.addSeat({ userId, shopId, seat })).rejects.toThrow(
        Exceptions.invalidAddSeatError,
      );
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(seatRepository.addSeat).not.toBeCalled();
    });
  });
});
