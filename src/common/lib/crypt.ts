import * as crypto from 'crypto';

export const hash = (val: string) => {
  // https://medium.com/@chris_72272/what-is-the-fastest-node-js-hashing-algorithm-c15c1a0e164e
  return crypto.createHash('sha1').update(val).digest('hex').substring(0, 10);
};
