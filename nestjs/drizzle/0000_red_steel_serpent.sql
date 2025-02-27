CREATE TABLE "billing_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"location" varchar NOT NULL,
	"premium_paid" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_billing_portal" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"photo" varchar NOT NULL,
	"billing_id" integer NOT NULL
);
