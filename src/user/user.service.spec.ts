import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { userData } from '../../test/data/user.data.mock';
import { MockUserRepository } from '../../test/repository/user.repository.mock';
import { saltCost } from '../auth/constant';
import { Role } from '../common/enum';
import { Exceptions } from '../common/exceptions';
import { IUser } from '../common/interface';
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
    beforeEach(async () => {
      jest.spyOn(bcrypt, 'compare').mockClear();
      jest.spyOn(bcrypt, 'hash').mockClear();
    });
    it('should su cceed resetting the password', async () => {
      //given
      const { password } = userData()[1];
      const user: IUser = {
        id: 2,
        role: Role.USER,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };

      const args: IResetPassword = {
        password: '12345678',
        newPassword: '87654321',
      };
      const hashedPassword = '$2a$10$AoYROAsFy0M4R1pTbyjY4upho4rSPQ4xGmMjfqeE9ZAh6NUzCUpU2';
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => hashedPassword);

      //when
      const result = await service.resetPassword(args, user);

      //then
      expect(result).toBe(true);
      expect(userRepository.resetPassword).toBeCalledWith(user.id, hashedPassword);
      expect(userRepository.resetPassword).toBeCalledTimes(1);
      expect(bcrypt.hash).toBeCalledTimes(1);
      expect(bcrypt.hash).toBeCalledWith(args.newPassword, saltCost);
      expect(bcrypt.compare).toBeCalledTimes(1);
      expect(bcrypt.compare).toBeCalledWith(args.password, password);
    });

    it('should fail resetting password if the given user does not exist', async function () {
      const user: IUser = {
        id: 100,
        role: Role.USER,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };
      //given
      jest.spyOn(userRepository, 'getOneById').mockResolvedValue(undefined);
      const args: IResetPassword = {
        password: '12345678',
        newPassword: '87654321',
      };

      //when - then
      await expect(service.resetPassword(args, user)).rejects.toThrow(Exceptions.userNotFoundError);
      expect(userRepository.resetPassword).not.toBeCalled();
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(bcrypt.compare).not.toBeCalled();
      expect(bcrypt.hash).not.toBeCalled();
    });

    it('should fail when the given password is wrong', async function () {
      const { password } = userData()[1];
      const user: IUser = {
        id: 2,
        role: Role.USER,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };

      //given
      const args: IResetPassword = {
        password: 'wrong password',
        newPassword: '87654321',
      };
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      //when - then
      await expect(service.resetPassword(args, user)).rejects.toThrow(
        Exceptions.invalidPasswordError,
      );
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(userRepository.resetPassword).not.toBeCalled();
      expect(bcrypt.compare).toBeCalledTimes(1);
      expect(bcrypt.compare).toBeCalledWith(args.password, password);
      expect(bcrypt.hash).not.toBeCalled();
    });
  });

  describe('delete user', () => {
    it('should succeed deleting a user when the admin is logged in', async function () {
      //given
      const { id } = userData()[0];
      const user: IUser = {
        id: 2,
        role: Role.ADMIN,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };
      //when
      const result = await service.deleteUser(id, user);
      //then
      expect(result).toBe(true);
      expect(userRepository.getOneById).toBeCalledTimes(1);
    });

    it('should succeed deleting a user when the user is logged in', async function () {
      //given
      const { id } = userData()[0];
      const user: IUser = {
        id: 1,
        role: Role.USER,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };
      //when
      const result = await service.deleteUser(id, user);
      //then
      expect(result).toBe(true);
      expect(userRepository.getOneById).toBeCalledTimes(1);
      expect(userRepository.deleteUser).toBeCalledTimes(1);
      expect(userRepository.deleteUser).toBeCalledWith(user.id);
    });

    it('should fail deleting a user when unauthorized', async function () {
      //given
      const { id, role } = userData()[0];
      const user: IUser = {
        id: 2,
        role,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };

      jest.spyOn(userRepository, 'getOneById').mockResolvedValue({ ...userData()[1] });

      //when-then
      await expect(service.deleteUser(id, user)).rejects.toThrow(Exceptions.notPermittedError);
    });

    it('should fail deleting a user when the user does not exist ', async function () {
      //given
      const idThatDoesNotExist = 1000;
      const user: IUser = {
        id: 2,
        role: Role.ADMIN,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
        refresh: true,
      };
      jest.spyOn(userRepository, 'getOneById').mockResolvedValue(undefined);
      //when-then
      await expect(service.deleteUser(idThatDoesNotExist, user)).rejects.toThrow(
        Exceptions.userNotFoundError,
      );
    });
  });
});
