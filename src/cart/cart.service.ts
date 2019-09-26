import { Injectable } from '@nestjs/common';
import { CreateCartDto} from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { CartEntity} from './cart.entity';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class CartService {
  constructor(private readonly inventoryService: InventoryService) {}
  async create(cartItem: CreateCartDto): Promise<any> {
    const inventoryItem = await this.inventoryService.findById(cartItem.inventoryId);
    const newCartItem = CartEntity.create(cartItem);
    newCartItem.inventory = inventoryItem;
    return CartEntity.save(newCartItem);
  }
  findAll(): Promise<any> {
    return CartEntity.find({ order: {id : 'ASC'}, relations: ['inventory'] });
  }

  findById(reqId: number): Promise<any> {
    return CartEntity.findOne({ where: {id: reqId}, relations: ['inventory']});
  }

  async update(reqId: number, updatedItem: UpdateCartDto): Promise<any> {
    const oldItem = await CartEntity.findOne({where: {id: reqId}});
    oldItem.quantity = updatedItem.quantity;
    return CartEntity.update(reqId, oldItem);
  }

  delete(id: number): Promise<any> {
    return CartEntity.delete(id);
  }
}
