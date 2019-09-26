import { Test, TestingModule } from '@nestjs/testing';
import { FinalDiscountController } from './final-discount.controller';

describe('FinalDiscount Controller', () => {
  let controller: FinalDiscountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinalDiscountController],
    }).compile();

    controller = module.get<FinalDiscountController>(FinalDiscountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
