import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import {InventoryEntity} from '../inventory/inventory.entity';

@Entity('discount')
export class DiscountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  multiple: number;

  @Column('float')
  percentage: number;

  @OneToOne(type => InventoryEntity)
  @JoinColumn()
  inventory: InventoryEntity;
}
