import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { userData } from '../../test/data/user.data.mock';
import { MockUserRepository } from '../../test/repository/user.repository.mock';
import { Exceptions } from '../common/exceptions';
import { IAddUser } from './interface/add-user.interface';
import { IResetPassword } from './interface/reset-password.interface';
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
      const id = 2;

      // when
      const result = await service.getUserById(id);

      // then
      const user = userData()[1];
      expect(result).toEqual(user);
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(userRepository.getOneById).toBeCalledWith(id);
    });
  });

  describe('getUserByEmail()', () => {
    it('normal case', async () => {
      // given
      const email = 'pirit.jeong@kyojs.com';

      // when
      const result = await service.getUserByEmail(email);

      // then
      const user = userData()[0];
      expect(result).toEqual(user);
      expect(userRepository.getOneByEmail).toBeCalledTimes(1);
      expect(userRepository.getOneByEmail).toBeCalledWith(email);
    });
  });

  describe('addUser()', () => {
    it('normal case', async () => {
      // given
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => hashedPassword);
      const { id, ...user } = userData()[0];
      const addUserArgs: IAddUser = user;

      //when
      const addUserOutput = await service.addUser(addUserArgs);

      //then
      expect(userRepository.addUser).toBeCalledWith({
        ...addUserArgs,
        password: hashedPassword,
      });
      expect(addUserOutput).toEqual({ id, ...user, password: hashedPassword });
    });
  });

  describe('resetPassword()', () => {
    it('should succeed resetting the password', async () => {
      //given
      const { id } = userData()[1];
      const args: IResetPassword = {
        userId: id,
        password: '12345678',
        newPassword: '87654321',
      };
      const hashedPassword = '$2a$10$AoYROAsFy0M4R1pTbyjY4upho4rSPQ4xGmMjfqeE9ZAh6NUzCUpU2';

      jest.spyOn(bcrypt, 'hash').mockImplementation(() => hashedPassword);

      //when
      const result = await service.resetPassword(args);

      //then
      expect(result).toBe(true);
      expect(userRepository.resetPassword).toBeCalledWith(id, hashedPassword);
      expect(userRepository.resetPassword).toBeCalledTimes(1);
      expect(bcrypt.hash).toBeCalledTimes(1);
    });

    it('should fail resetting password if the given user does not exist', async function () {
      //given
      jest.spyOn(userRepository, 'getOneById').mockResolvedValue(undefined);
      const args: IResetPassword = {
        userId: 100,
        password: '12345678',
        newPassword: '87654321',
      };

      //when - then
      await expect(service.resetPassword(args)).rejects.toThrow(Exceptions.userNotFoundError);
      expect(userRepository.resetPassword).not.toBeCalled();
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(bcrypt.hash).toBeCalledTimes(1);
    });

    it('should fail when the given password is wrong', async function () {
      //given
      const { id } = userData()[1];
      const args: IResetPassword = {
        userId: id,
        password: 'wrong password',
        newPassword: '87654321',
      };

      //when - then
      await expect(service.resetPassword(args)).rejects.toThrow(Exceptions.invalidPasswordError);
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(userRepository.resetPassword).not.toBeCalled();
      expect(bcrypt.hash).toBeCalledTimes(1);
    });
  });
});
