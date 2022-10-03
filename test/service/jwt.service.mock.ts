import { jwtData } from '../data/jwt.data.mock';

export const MockJwtService = () => ({
  sign: jest.fn().mockImplementation((payload, options) => {
    if (payload?._refresh === true) {
      return jwtData().refreshToken;
    }

    return jwtData().accessToken;
  }),
});
