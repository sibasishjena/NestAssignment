import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';
import { DiscountModule } from './discount/discount.module';
import { FinalDiscountModule } from './final-discount/final-discount.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [TypeOrmModule.forRoot(), InventoryModule, CartModule, DiscountModule, FinalDiscountModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
