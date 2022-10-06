import { Gender } from '../../common/enum/gender';

export interface IAddMenuWithInfo {
  shopId: number;
  name: string;
  includeCutOption: boolean;
  includeShampooOption: boolean;
  normalPrice: number;
  salesPrice: number;
  estimatedMinutes?: number;
  description?: string;
  discountRate?: number;
  gender?: Gender;
  imageUrls?: string[];
}
