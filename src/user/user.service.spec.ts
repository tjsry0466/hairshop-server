import { Test, TestingModule } from '@nestjs/testing';

import { userData } from '../../test/data/user.data.mock';
import { MockUserRepository } from '../../test/repository/user.repository.mock';
import { UserRepository } from './repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: MockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserForLogin()', () => {
    it('normal case', async () => {
      // given
      const email = 'pirit@kyojs.com';

      // when
      const result = await service.getUserForLogin(email);

      // then
      const user = userData()[0];
      expect(result).toEqual(user);
      expect(userRepository.getUserForLogin).toBeCalledTimes(1);
      expect(userRepository.getUserForLogin).toBeCalledWith(email);
    });
  });

  describe('getUserById()', () => {
    it('normal case', async () => {
      // given
      const id = 1;

      // when
      const result = await service.getUserById(id);

      // then
      const user = userData()[0];
      expect(result).toEqual(user);
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(userRepository.getOneById).toBeCalledWith(id);
    });
  });
});
