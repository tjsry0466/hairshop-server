import { Test, TestingModule } from '@nestjs/testing';

import { reservationData } from '../../test/data/reservation.data.mock';
import { MockReservationRepository } from '../../test/repository/reservation.repository.mock';
import { MockMenuService } from '../../test/service/menu.service.mock';
import { MockShopService } from '../../test/service/shop.service.mock';
import { Exceptions } from '../common/exceptions';
import { MenuService } from '../menu/menu.service';
import { ShopService } from '../shop/shop.service';
import { IReservationInfo } from './interface/date-range.interface';
import { ReservationRepository } from './repository/reservation.repository';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let shopService: ShopService;
  let menuService: MenuService;
  let reservationRepository: ReservationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationRepository,
          useValue: MockReservationRepository(),
        },
        {
          provide: ShopService,
          useValue: MockShopService(),
        },
        {
          provide: MenuService,
          useValue: MockMenuService(),
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    shopService = module.get<ShopService>(ShopService);
    menuService = module.get<MenuService>(MenuService);
    reservationRepository = module.get<ReservationRepository>(ReservationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getReservationByInfo()', () => {
    it('normal case', async () => {
      // given
      const args: IReservationInfo = {
        shopId: 1,
        menuId: 1,
        row: 0,
        column: 0,
        reservationDate: '2022-01-01',
        startTime: new Date('2022-01-01 12:00:00'),
        endTime: new Date('2022-01-01 12:20:00'),
      };

      // when
      const result = await service.getReservationByInfo(args);

      // then
      expect(result).toEqual([]);
      expect(reservationRepository.getOneByReservationInfo).toBeCalledTimes(1);
      expect(reservationRepository.getOneByReservationInfo).toBeCalledWith(args);
    });
  });

  describe('addReservation()', () => {
    it('normal case', async () => {
      // given
      const userId = 1;
      const shopId = 1;
      const menuId = 1;
      const row = 0;
      const column = 0;
      const startTime = new Date('2022-01-01 12:00:00');
      const requireMinute = 20;

      // when
      const result = await service.addReservation({
        userId,
        shopId,
        menuId,
        row,
        column,
        startTime,
        requireMinute,
      });

      // then
      expect(result).toBe(true);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(menuService.getMenuById).toBeCalledTimes(1);
      expect(menuService.getMenuById).toBeCalledWith(menuId);
      const reservationDate = '2022-01-01';
      const endTime = new Date('2022-01-01 12:20:00');
      expect(reservationRepository.getOneByReservationInfo).toBeCalledTimes(1);
      expect(reservationRepository.getOneByReservationInfo).toBeCalledWith({
        shopId,
        menuId,
        row,
        column,
        reservationDate,
        startTime,
        endTime,
      });
      expect(reservationRepository.addReservation).toBeCalledTimes(1);
      expect(reservationRepository.addReservation).toBeCalledWith({
        userId,
        shopId,
        menuId,
        row,
        column,
        startTime,
        endTime,
        requireMinute,
        reservationDate,
      });
    });

    it('가게 정보가 존재하지 않는 경우', async () => {
      // given
      jest.spyOn(shopService, 'getShopById').mockResolvedValue(undefined);
      const userId = 1;
      const shopId = 1;
      const menuId = 1;
      const row = 0;
      const column = 0;
      const startTime = new Date('2022-01-01 12:00:00');
      const requireMinute = 20;

      // when - then
      await expect(
        service.addReservation({
          userId,
          shopId,
          menuId,
          row,
          column,
          startTime,
          requireMinute,
        }),
      ).rejects.toThrow(Exceptions.shopNotFoundError);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(menuService.getMenuById).not.toBeCalled();
      expect(reservationRepository.getOneByReservationInfo).not.toBeCalled();
      expect(reservationRepository.addReservation).not.toBeCalled();
    });

    it('시술 정보가 존재하지 않는 경우', async () => {
      // given
      jest.spyOn(menuService, 'getMenuById').mockResolvedValue(undefined);
      const userId = 1;
      const shopId = 1;
      const menuId = 1;
      const row = 0;
      const column = 0;
      const startTime = new Date('2022-01-01 12:00:00');
      const requireMinute = 20;

      // when - then
      await expect(
        service.addReservation({
          userId,
          shopId,
          menuId,
          row,
          column,
          startTime,
          requireMinute,
        }),
      ).rejects.toThrow(Exceptions.menuNotFoundError);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(menuService.getMenuById).toBeCalledTimes(1);
      expect(menuService.getMenuById).toBeCalledWith(menuId);
      expect(reservationRepository.getOneByReservationInfo).not.toBeCalled();
      expect(reservationRepository.addReservation).not.toBeCalled();
    });

    it('이미 예약된 좌석인 경우', async () => {
      // given
      jest
        .spyOn(reservationRepository, 'getOneByReservationInfo')
        .mockResolvedValue(reservationData());
      const userId = 1;
      const shopId = 1;
      const menuId = 1;
      const row = 0;
      const column = 0;
      const startTime = new Date('2022-01-01 12:00:00');
      const requireMinute = 20;

      // when - then
      await expect(
        service.addReservation({
          userId,
          shopId,
          menuId,
          row,
          column,
          startTime,
          requireMinute,
        }),
      ).rejects.toThrow(Exceptions.alreadyReservedError);
      expect(shopService.getShopById).toBeCalledTimes(1);
      expect(shopService.getShopById).toBeCalledWith(shopId);
      expect(menuService.getMenuById).toBeCalledTimes(1);
      expect(menuService.getMenuById).toBeCalledWith(menuId);
      const reservationDate = '2022-01-01';
      const endTime = new Date('2022-01-01 12:20:00');
      expect(reservationRepository.getOneByReservationInfo).toBeCalledTimes(1);
      expect(reservationRepository.getOneByReservationInfo).toBeCalledWith({
        shopId,
        menuId,
        row,
        column,
        reservationDate,
        startTime,
        endTime,
      });
      expect(reservationRepository.addReservation).not.toBeCalled();
    });
  });
});
