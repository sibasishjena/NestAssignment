import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateDiscountDto {
  @ApiModelProperty()
  readonly multiple: number;

  @ApiModelProperty()
  readonly percentage: number;
}
