import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { InventoryEntity } from '../inventory/inventory.entity';

@Entity('cart')
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @OneToOne(type => InventoryEntity)
  @JoinColumn()
  inventory: InventoryEntity;
}
