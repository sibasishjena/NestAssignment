import { Controller, Get, HttpException, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/createDiscount.dto';
import { UpdateDiscountDto } from './dto/updateDiscount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}
  @Get()
  async findAll() {
    return await this.discountService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const reqItem = await this.discountService.findById(id);
    if (!reqItem) {
      throw new HttpException(`Discount iten with id: ${id} doesnot exist`, 404);
    }
    return reqItem;
  }

  @Post()
  async create(@Body() body: CreateDiscountDto) {
    return await this.discountService.create(body);
  }

  @Put(':id')
  async update(@Body() body: UpdateDiscountDto , @Param('id') id: number): Promise<any> {
    return await this.discountService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.discountService.delete(id);
  }
}
