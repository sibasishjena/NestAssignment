import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('finaldiscount')
export class FinalDiscountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  price: number;

  @Column('float')
  discountAmount: number;
}
