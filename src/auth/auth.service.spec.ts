import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { jwtData } from '../../test/data/jwt.data.mock';
import { MockJwtService } from '../../test/service/jwt.service.mock';
import { MockUserService } from '../../test/service/user.service.mock';
import { Role } from '../common/enum';
import { Exceptions } from '../common/exceptions';
import { IUser } from '../common/interface';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-05-10 16:00:00'));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: MockUserService(),
        },
        {
          provide: JwtService,
          useValue: MockJwtService(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signJsonWebToken()', () => {
    it('normal case', () => {
      // given
      const userId = 1;
      const role = Role.USER;

      // when
      const result = service.signJsonWebToken(userId, role);

      expect(result).toEqual({
        accessToken: jwtData().accessToken,
        refreshToken: jwtData().refreshToken,
      });
      expect(jwtService.sign).toBeCalledTimes(2);
      expect(jwtService.sign).toBeCalledWith({ _id: userId, _role: role }, { expiresIn: '10m' });
      expect(jwtService.sign).toBeCalledWith(
        { _id: userId, _role: role, _refresh: true },
        { expiresIn: '7d' },
      );
    });
  });

  describe('loginByRefreshToken', () => {
    it('normal case.', async () => {
      // given
      const user: IUser = {
        id: 1234,
        role: Role.USER,
        exp: 1652416989, // 2022??? 5??? 13??? ????????? 13:43:09
        refresh: true,
      };

      // when
      const result = await service.loginByRefreshToken(user);

      // then
      expect(result).toEqual({
        accessToken: jwtData().accessToken,
        refreshToken: jwtData().refreshToken,
      });
    });
  });

  describe('login', () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(async (password, userPassword) => {
      if (password === userPassword) {
        return true;
      } else {
        return false;
      }
    });

    it('????????? ???????????? ?????? ??????', async () => {
      // given
      jest.spyOn(userService, 'getUserForLogin').mockResolvedValue(undefined);
      const loginArgs: LoginArgs = {
        email: 'pirit@kyojs.com',
        password: '9999',
      };

      // when - then
      await expect(service.login(loginArgs)).rejects.toThrow(Exceptions.userNotFoundError);
      expect(userService.getUserForLogin).toBeCalledTimes(1);
      expect(userService.getUserForLogin).toBeCalledWith(loginArgs.email);
      expect(bcrypt.compare).not.toBeCalled();
    });

    it('??????????????? ?????? ??????', async () => {
      // given
      const loginArgs: LoginArgs = {
        email: 'pirit@kyojs.com',
        password: '9999',
      };

      // when - then
      await expect(service.login(loginArgs)).rejects.toThrow(Exceptions.invalidPasswordError);
      expect(userService.getUserForLogin).toBeCalledTimes(1);
      expect(userService.getUserForLogin).toBeCalledWith(loginArgs.email);
      expect(bcrypt.compare).toBeCalledTimes(1);
      expect(bcrypt.compare).toBeCalledWith(loginArgs.password, '12345678');
    });

    it('?????? ?????????', async () => {
      // given
      const loginArgs: LoginArgs = {
        email: 'pirit@kyojs.com',
        password: '12345678',
      };

      // when
      const result = await service.login(loginArgs);

      // then
      const jwt = jwtData();
      expect(result).toEqual({
        accessToken: jwt.accessToken,
        refreshToken: jwt.refreshToken,
      });
      expect(userService.getUserForLogin).toBeCalledTimes(1);
      expect(userService.getUserForLogin).toBeCalledWith(loginArgs.email);
      expect(bcrypt.compare).toBeCalledTimes(1);
      expect(bcrypt.compare).toBeCalledWith(loginArgs.password, '12345678');
    });
  });

  describe('signup()', () => {
    it('normal case', async () => {
      // given
      jest.spyOn(service, 'signJsonWebToken').mockReturnValue({
        accessToken: jwtData().accessToken,
        refreshToken: jwtData().refreshToken,
      });
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);
      const signupArgs = {
        email: 'pirit@kyojs.com',
        password: '12345678',
        name: 'pirit',
        role: Role.USER,
      };

      // when
      const signupOutput = await service.signup(signupArgs);

      // then
      expect(userService.getUserByEmail).toBeCalledTimes(1);
      expect(userService.getUserByEmail).toBeCalledWith(signupArgs.email);
      expect(userService.addUser).toBeCalledTimes(1);
      expect(userService.addUser).toBeCalledWith(signupArgs);
      expect(service.signJsonWebToken).toBeCalledTimes(1);
      expect(signupOutput).toEqual({
        accessToken: jwtData().accessToken,
        refreshToken: jwtData().refreshToken,
        user: { id: 1, ...signupArgs, password: 'hashedPassword' },
      });
    });

    it('????????? ???????????? ???????????? ??????', async () => {
      // given
      jest.spyOn(service, 'signJsonWebToken').mockReturnValue({
        accessToken: jwtData().accessToken,
        refreshToken: jwtData().refreshToken,
      });
      const signupArgs = {
        email: 'pirit.test@kyojs.com',
        password: '12345678',
        name: 'pirit',
        role: Role.USER,
      };

      // when - then
      await expect(service.signup(signupArgs)).rejects.toThrow(Exceptions.emailAlreadyExistsError);
      expect(userService.getUserByEmail).toBeCalledTimes(1);
      expect(userService.getUserByEmail).toBeCalledWith(signupArgs.email);
      expect(userService.addUser).not.toBeCalled();
      expect(service.signJsonWebToken).not.toBeCalled();
    });
  });
});
