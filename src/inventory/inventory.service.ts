import { Injectable } from '@nestjs/common';
import { InventoryEntity } from './inventory.entity';
import { InventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  create(item: InventoryDto): Promise<any> {
    return InventoryEntity.save(InventoryEntity.create(item));
  }

  findAll(): Promise<any> {
    return InventoryEntity.find({order: {id : 'ASC'}});
  }

  findById(reqId: number): Promise<any> {
    return InventoryEntity.findOne({where: { id : reqId}});
  }

  update(id: number, updatedItem: InventoryDto): Promise<any> {
    return InventoryEntity.update(id, updatedItem);
  }

  delete(id: number): Promise<any> {
    return InventoryEntity.delete(id);
  }
}
