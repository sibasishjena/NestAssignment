import { Injectable } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { CreateDiscountDto } from './dto/createDiscount.dto';
import { DiscountEntity } from './discount.entity';
import { UpdateDiscountDto } from './dto/updateDiscount.dto';

@Injectable()
export class DiscountService {
  constructor(private readonly inventoryService: InventoryService) {}

  async create(discountItem: CreateDiscountDto): Promise<any> {
    const inventoryItem = await this.inventoryService.findById(discountItem.inventoryId);
    const newDiscountItem = DiscountEntity.create(discountItem);
    newDiscountItem.inventory = inventoryItem;
    return DiscountEntity.save(newDiscountItem);
  }

  findAll(): Promise<any> {
    return DiscountEntity.find({ order: {id : 'ASC'}, relations: ['inventory'] });
  }

  findById(reqId: number): Promise<any> {
    return DiscountEntity.findOne({ where: {id: reqId}, relations: ['inventory']});
  }

  findByInventoryId(reqId: number): Promise<any> {
    return DiscountEntity.findOne({ where: { inventory: { id: reqId}}});
  }

  async update(reqId: number, updatedItem: UpdateDiscountDto): Promise<any> {
    const oldItem = await DiscountEntity.findOne({where: {id: reqId}});
    oldItem.multiple = updatedItem.multiple;
    oldItem.percentage = updatedItem.percentage;
    return DiscountEntity.update(reqId, oldItem);
  }

  delete(id: number): Promise<any> {
    return DiscountEntity.delete(id);
  }
}
