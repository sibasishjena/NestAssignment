import { Test, TestingModule } from '@nestjs/testing';
import { FinalDiscountService } from './final-discount.service';

describe('FinalDiscountService', () => {
  let service: FinalDiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinalDiscountService],
    }).compile();

    service = module.get<FinalDiscountService>(FinalDiscountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
