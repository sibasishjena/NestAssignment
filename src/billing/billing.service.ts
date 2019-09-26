import { Injectable } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { CartService } from '../cart/cart.service';
import { DiscountService } from '../discount/discount.service';
import { FinalDiscountService } from '../final-discount/final-discount.service';
import { BillingDto } from './dto/billing.dto';
import { CheckOutDto } from './dto/checkout.dto';
import { CartEntity } from 'src/cart/cart.entity';
import { format, evaluate } from 'mathjs';
import { DiscountEntity } from 'src/discount/discount.entity';
import math = require('mathjs');
import { FinalDiscountEntity } from 'src/final-discount/final-discount.entity';

@Injectable()
export class BillingService {
  private scannedItem: BillingDto;
  private finalBill: CheckOutDto;
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly cartService: CartService,
    private readonly discountService: DiscountService,
    private readonly finalDiscountService: FinalDiscountService) {
      this.finalBill = new CheckOutDto();
      this.finalBill.itemList = new Array<BillingDto>();
      this.scannedItem = new BillingDto();
    }

    async getCartItems() {
      const cartItemList: CartEntity[] = await this.cartService.findAll();
      for (const item of cartItemList) {
        this.scannedItem.inventoryId = item.inventory.id;
        this.scannedItem.name = item.inventory.name;
        this.scannedItem.price = item.inventory.price;
        this.scannedItem.quantity = item.quantity;
        this.scannedItem.totalPrice = parseFloat(format(evaluate(`${item.inventory.price} * ${item.quantity}`),
         {notation: 'fixed', precision: 3}));
        this.finalBill.itemList.push(JSON.parse(JSON.stringify(this.scannedItem)));
      }
      return this.calculateDiscount();
    }

    async calculateDiscount() {
      for (const item of this.finalBill.itemList) {
        const discount: DiscountEntity = await this.discountService.findByInventoryId(item.inventoryId);
        if (discount) {
          const nonDiscountedItems = evaluate(`${item.quantity} % ${discount.multiple}`);
          const discountedItemsTotalPrice = evaluate(`${item.price}*(${item.quantity}-${nonDiscountedItems})`);
          item.discount = parseFloat(format(evaluate(`${discountedItemsTotalPrice}*(${discount.percentage}/100)`),
           {notation: 'fixed', precision: 3}));
        } else {
          item.discount = 0;
        }
        item.discountedPrice = item.totalPrice - item.discount;
      }
      return this.calculateCartDiscount();
    }

    async calculateCartDiscount() {
      this.finalBill.totalPrice = 0;
      this.finalBill.totalItemsDiscount = 0;
      for (const item of this.finalBill.itemList) {
        this.finalBill.totalPrice += item.totalPrice;
        this.finalBill.totalItemsDiscount += item.discount;
      }
      const finalDiscountItem: FinalDiscountEntity = await this.finalDiscountService.findAllOrderedPrice(math.ceil(this.finalBill.totalPrice
        - this.finalBill.totalItemsDiscount));
      this.finalBill.finalDiscount = finalDiscountItem.discountAmount;
      this.finalBill.discountedPrice = parseFloat(format(evaluate(
        `${this.finalBill.totalPrice} - ${this.finalBill.totalItemsDiscount} - ${this.finalBill.finalDiscount}`),
         {notation: 'fixed', precision: 3}));
      return this.finalBill;
    }
}
