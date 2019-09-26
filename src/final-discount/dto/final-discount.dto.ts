import { ApiModelProperty } from '@nestjs/swagger';

export class FinalDiscountDto {
  readonly id: number;

  @ApiModelProperty()
  readonly price: number;

  @ApiModelProperty()
  readonly discountAmount: number;
}
