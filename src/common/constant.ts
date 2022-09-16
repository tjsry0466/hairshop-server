export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isLocal = process.env.NODE_ENV === 'local';
export const env = process.env.USER || process.env.NODE_ENV || 'local';

export const DEFAULT_LIMIT = 10;
export const DEFAULT_OFFSET = 0;
