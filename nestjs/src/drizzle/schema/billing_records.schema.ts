import {
    integer,
    numeric,
    pgTable,
    serial,
    varchar,
  } from 'drizzle-orm/pg-core';

export const billing_records = pgTable('billing_records', {
    id: serial('id').primaryKey(),
    product_id: integer('product_id').notNull(),
    location: varchar('location').notNull(),
    premium_paid: numeric('premium_paid',{ precision: 10, scale: 2 }).notNull(),
  });
  