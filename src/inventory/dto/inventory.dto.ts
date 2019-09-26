import { ApiModelProperty } from '@nestjs/swagger';

export class InventoryDto {
  readonly id: number;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly price: number;
}
