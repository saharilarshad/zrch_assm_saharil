import {
  integer,
    pgTable,
    serial,
    varchar,
  } from 'drizzle-orm/pg-core';
  
  export const customer_billing_portal = pgTable('customer_billing_portal', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name').notNull(),
    photo: varchar('photo').notNull(),
    billing_id: integer('billing_id').notNull(),
  });
  
  