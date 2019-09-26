import { BillingDto } from './billing.dto';

export class CheckOutDto {
  itemList: BillingDto[];
  totalPrice: number;
  totalItemsDiscount: number;
  finalDiscount: number;
  discountedPrice: number;
}
