import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCartDto {
  readonly id: number;

  @ApiModelProperty()
  readonly quantity: number;

  @ApiModelProperty()
  readonly inventoryId: number;
}
