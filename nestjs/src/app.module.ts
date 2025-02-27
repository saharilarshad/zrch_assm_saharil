import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { BillingModule } from './billing/billing.module';
import { ConfigModule } from '@nestjs/config';
// import { GuardsModule } from './guards/api-key-guards';

@Module({
  imports: [
    DrizzleModule,
    BillingModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // GuardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
