import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiModelProperty()
  readonly quantity: number;
}
