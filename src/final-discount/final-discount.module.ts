import { Module } from '@nestjs/common';
import { FinalDiscountController } from './final-discount.controller';
import { FinalDiscountService } from './final-discount.service';

@Module({
  controllers: [FinalDiscountController],
  providers: [FinalDiscountService],
  exports: [FinalDiscountService],
})
export class FinalDiscountModule {}
