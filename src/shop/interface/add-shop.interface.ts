import { DAY_OF_WEEK } from '../../common/enum/day-of-week';

export interface IAddShop {
  ownerId: number;
  name: string;
  branchName: string;
  intro: string;
  imageUrls: string[];
  offDay: DAY_OF_WEEK[];
  address: string;
  latitude?: number;
  longitude?: number;
  additionalInfos?: string[];
  locationDescription?: string;
  safeNumber?: string;
}
