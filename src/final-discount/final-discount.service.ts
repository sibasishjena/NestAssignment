import { Injectable } from '@nestjs/common';
import { FinalDiscountDto } from './dto/final-discount.dto';
import { FinalDiscountEntity } from './final-discount.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
export class FinalDiscountService {
  create(item: FinalDiscountDto): Promise<any> {
    return FinalDiscountEntity.save(FinalDiscountEntity.create(item));
  }

  findAll(): Promise<any> {
    return FinalDiscountEntity.find({order: {id : 'ASC'}});
  }

  findById(reqId: number): Promise<any> {
    return FinalDiscountEntity.findOne({where: { id : reqId}});
  }

  findAllOrderedPrice(reqPrice: number): Promise<any> {
    return FinalDiscountEntity.findOne({order: { price : 'DESC'}, where: { price : LessThanOrEqual(reqPrice)} });
  }

  update(id: number, updatedItem: FinalDiscountDto): Promise<any> {
    return FinalDiscountEntity.update(id, updatedItem);
  }

  delete(id: number): Promise<any> {
    return FinalDiscountEntity.delete(id);
  }
}
