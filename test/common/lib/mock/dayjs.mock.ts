import * as dayjs from 'dayjs';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
