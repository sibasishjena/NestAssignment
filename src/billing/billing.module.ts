import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { InventoryModule } from '../inventory/inventory.module';
import { CartModule } from '../cart/cart.module';
import { DiscountModule } from '../discount/discount.module';
import { FinalDiscountModule } from '../final-discount/final-discount.module';

@Module({
  imports: [InventoryModule, CartModule, DiscountModule, FinalDiscountModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
