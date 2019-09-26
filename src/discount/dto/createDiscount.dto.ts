import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
  readonly id: number;

  @ApiModelProperty()
  readonly multiple: number;

  @ApiModelProperty()
  readonly percentage: number;

  @ApiModelProperty()
  readonly inventoryId: number;
}
