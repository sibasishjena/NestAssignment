import { Controller, Get , Post, Put, Delete, Param, HttpException, Body} from '@nestjs/common';
import { FinalDiscountService } from './final-discount.service';
import { FinalDiscountDto } from './dto/final-discount.dto';

@Controller('final-discount')
export class FinalDiscountController {
  constructor(private readonly finalDiscountService: FinalDiscountService) {}
  @Get()
  async findAll() {
    return await this.finalDiscountService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const reqItem = await this.finalDiscountService.findById(id);
    if (!reqItem) {
      throw new HttpException(`Final discount item with id: ${id} doesnot exist`, 404);
    }
    return reqItem;
  }

  @Post()
  async create(@Body() body: FinalDiscountDto)  {
    return await this.finalDiscountService.create(body);
  }

  @Put(':id')
  async update(@Body() body: FinalDiscountDto , @Param('id') id: number): Promise<any> {
    return await this.finalDiscountService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.finalDiscountService.delete(id);
  }
}
