import {ProductResponse} from '../../generated';

export type OrderCart = {
  id: string;
  product?: Partial<ProductResponse>;
  quantity: number;
};
