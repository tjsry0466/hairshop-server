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
    jest.spyOn(service, 'signJsonWebToken').mockReturnValue({
      accessToken: jwtData().accessToken,
      refreshToken: jwtData().refreshToken,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loginByRefreshToken', () => {
    it('normal case.', async () => {
      // given
      const user: IUser = {
        id: 1234,
        role: Role.USER,
        exp: 1652416989, // 2022년 5월 13일 금요일 13:43:09
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

    it('회원이 존재하지 않는 경우', async () => {
      // given
      jest.spyOn(userService, 'getUserForLogin').mockResolvedValue(undefined);
      const loginArgs: LoginArgs = {
        email: 'noUser@email.com',
        password: '1234',
      };

      // when - then
      await expect(service.login(loginArgs)).rejects.toThrow(Exceptions.userNotFoundError);
      expect(userService.getUserForLogin).toBeCalledTimes(1);
      expect(userService.getUserForLogin).toBeCalledWith(loginArgs.email);
    });

    it('정상 로그인', async () => {
      // given
      const loginArg: LoginArgs = {
        email: 'pirit@kyojs.com',
        password: '12345678',
      };

      // when
      const result = await service.login(loginArg);

      // then
      const jwt = jwtData();
      expect(result).toEqual({
        accessToken: jwt.accessToken,
        refreshToken: jwt.refreshToken,
      });
      expect(userService.getUserForLogin).toBeCalledTimes(1);
      expect(userService.getUserForLogin).toBeCalledWith(loginArg.email);
    });
  });
});
