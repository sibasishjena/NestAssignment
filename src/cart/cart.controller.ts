import { Controller, Get, Post, Body, HttpException, Put, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get()
  async findAll() {
    return await this.cartService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const reqItem = await this.cartService.findById(id);
    if (!reqItem) {
      throw new HttpException(`Cart iten with id: ${id} doesnot exist`, 404);
    }
    return reqItem;
  }

  @Post()
  async create(@Body() body: CreateCartDto) {
    return await this.cartService.create(body);
  }

  @Put(':id')
  async update(@Body() body: UpdateCartDto , @Param('id') id: number): Promise<any> {
    return await this.cartService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.cartService.delete(id);
  }
}
