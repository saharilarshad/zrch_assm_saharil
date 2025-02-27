import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { DRIZZLE } from '../drizzle/drizzle.module';


const mockDrizzleConnection = {
  connect: jest.fn(),
  query: jest.fn(),
};

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        { provide: DRIZZLE, useValue: mockDrizzleConnection },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
