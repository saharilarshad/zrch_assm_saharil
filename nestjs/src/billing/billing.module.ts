import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [BillingController],
  providers: [BillingService],
  imports:[DrizzleModule]
})
export class BillingModule {}
