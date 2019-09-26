import { Controller, Get, Param, HttpException, Body, Post, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Get()
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const reqItem = await this.inventoryService.findById(id);
    if (!reqItem) {
      throw new HttpException(`Item with id: ${id} doesnot exist`, 404);
    }
    return reqItem;
  }

  @Post()
  async create(@Body() body: InventoryDto)  {
    return await this.inventoryService.create(body);
  }

  @Put(':id')
  async update(@Body() body: InventoryDto , @Param('id') id: number): Promise<any> {
    return await this.inventoryService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.inventoryService.delete(id);
  }
}
