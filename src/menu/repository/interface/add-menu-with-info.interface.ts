import { Gender } from '../../../common/enum/gender';

export interface IAddMenu {
  userId: number;
  shopId: number;
  name: string;
  includeCutOption: boolean;
  includeShampooOption: boolean;
  requireMinute?: number;
  price: number;
  description?: string;
  discountRate?: number;
  gender?: Gender;
  imageUrls?: string[];
}
