import { Inject, Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle.s';
import { customer_billing_portal } from '../drizzle/schema/customer_billing_portal.schema';
import { billing_records } from '../drizzle/schema/billing_records.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class BillingService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {
    // console.log(this.db);
  }

  async create(createBillingDto: CreateBillingDto) {
    const {
      // email,
      // first_name,
      // last_name,
      // photo,
      productCode,
      location,
      premiumPaid,
    } = createBillingDto;

    try {
      const customerInsertResult = await this.db
        .insert(billing_records)
        .values({
          product_id: productCode,
          location: location,
          premium_paid: premiumPaid.toString(),
        });

      return customerInsertResult;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(productCode?: number | null, location?: string) {
    if (!this.db) {
      console.error('DrizzleDB is not injected');
      return;
    }

    if ((productCode && productCode !== null) && location) {
      const byProductCodeAndLocation = await this.db
        .select()
        .from(billing_records)
        .innerJoin(
          customer_billing_portal,
          eq(billing_records.id, customer_billing_portal.billing_id),
        )
        .where(
          and(
            eq(billing_records.product_id, productCode),
            eq(billing_records.location, location),
          ),
        );

      return byProductCodeAndLocation;
    } else if (productCode !== null && productCode !== undefined) {
      const byProductCode = await this.db
        .select()
        .from(billing_records)
        .innerJoin(
          customer_billing_portal,
          eq(billing_records.id, customer_billing_portal.billing_id),
        )
        .where(eq(billing_records.product_id, productCode));

      return byProductCode;
    } else if (location) {
      const byLocation = await this.db
        .select()
        .from(billing_records)
        .innerJoin(
          customer_billing_portal,
          eq(billing_records.id, customer_billing_portal.billing_id),
        )
        .where(eq(billing_records.location, location));

      return byLocation;
    } else {
      const customers = await this.db
        .select()
        .from(billing_records)
        .innerJoin(
          customer_billing_portal,
          eq(billing_records.id, customer_billing_portal.billing_id),
        );

      return customers;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} billing`;
  }

  async update(productCode: number, updateBillingDto: UpdateBillingDto) {
    try {
      // const updatedRecords = await this.db
      //   .update(billing_records)
      //   .set({
      //     location: updateBillingDto.location,
      //     premium_paid: updateBillingDto.premiumPaid,
      //   })
      //   .where(eq(billing_records.product_id, productCode));
      
        const updatedRecords = await this.db
        .update(billing_records)
        .set({
          location: updateBillingDto.location,
          premium_paid: updateBillingDto.premiumPaid,
        })
        .where(eq(billing_records.id, updateBillingDto.billingId));

      return updatedRecords;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(productCode: number) {
    // console.log("productCode",productCode)

    try {
      const deleteRecord = await this.db
        .delete(billing_records)
        .where(eq(billing_records.product_id, productCode));

      return deleteRecord;
    } catch (error) {
      console.log(error);
    }
  }
}
