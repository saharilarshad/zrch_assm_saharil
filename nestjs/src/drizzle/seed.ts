import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: true,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

import { customerData } from '../lib/data';

async function main() {
  try {
    const customerPromises = customerData.map(async (customer) => {
      const {
        email,
        first_name,
        last_name,
        photo,
        product_id,
        location,
        premium_paid,
      } = customer;

      const createBilling = await db
        .insert(schema.billing_records)
        .values({
          product_id: product_id,
          location: location,
          premium_paid: premium_paid.toString(),
        })
        .returning();

      const bilingId = createBilling[0]?.id;

      if (bilingId !== undefined) {
        await db
          .insert(schema.customer_billing_portal)
          .values({
            email,
            first_name,
            last_name,
            photo,
            billing_id: bilingId,
          })
          .returning();
      }
    });

    await Promise.all(customerPromises);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await pool.end();
  }
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
