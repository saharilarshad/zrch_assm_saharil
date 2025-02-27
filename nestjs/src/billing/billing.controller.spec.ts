import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { ConfigModule } from '@nestjs/config';
import { DRIZZLE } from '../drizzle/drizzle.module';

describe('BillingController', () => {
    let controller: BillingController; 
    let service: BillingService;
    
    const mockCreate = jest.fn();

    const mockDrizzleConnection = {};

    const mockBillingService = {
      create: mockCreate,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [ConfigModule], 
          controllers: [BillingController],
          providers: [
            { provide: BillingService, useValue: mockBillingService }, 
            { provide: DRIZZLE, useValue: mockDrizzleConnection }, 
          ],
        }).compile();
    
        controller = module.get<BillingController>(BillingController);
        service = module.get<BillingService>(BillingService); 
    });
    
    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined(); 
    });
    
    describe('create', () => {
        const createBillingDto: CreateBillingDto = {
          productCode: 123,
          location: 'Test Location',
          premiumPaid: '100.50',
        };
    
        it('should call service with correct parameters', async () => {
          const mockResult = { id: 1, ...createBillingDto };
    
          mockCreate.mockResolvedValue(mockResult);
    
          const result = await controller.create(createBillingDto);
    
          expect(mockCreate).toHaveBeenCalledWith(createBillingDto); 
          expect(result).toEqual(mockResult); 
        });
    
        it('should return a successfully created billing', async () => {
          const mockResult = { id: 1, ...createBillingDto };
    
          mockCreate.mockResolvedValue(mockResult);
    
          const result = await controller.create(createBillingDto);
    
          expect(result).toEqual(mockResult); 
        });
    
        it('should throw an error if create fails', async () => {
          mockCreate.mockRejectedValue(new Error('Failed to create billing'));
    
          await expect(controller.create(createBillingDto)).rejects.toThrow(
            'Failed to create billing', 
          );
        });
      });
});
