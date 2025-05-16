CREATE TYPE "part_size" AS ENUM (
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl'
);

CREATE TYPE "order_state" AS ENUM (
  'created',
  'in_progress',
  'completed'
);

CREATE TYPE "job_type" AS ENUM (
  'direct_sale',
  'reparation'
);

CREATE TABLE "customers" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "lastname" text,
  "email" text UNIQUE
);

CREATE TABLE "vehicle_types" (
  "id" uuid PRIMARY KEY,
  "model" text,
  "company" text,
  "year" int,
  "version" text
);

CREATE TABLE "vehicles" (
  "id" uuid PRIMARY KEY,
  "customer_id" uuid,
  "vehicle_type_id" uuid,
  "license_plate" text UNIQUE,
  "vin" text
);

CREATE TABLE "skus" (
  "id" uuid PRIMARY KEY,
  "sku_value" text UNIQUE,
  "size" part_size,
  "description" text
);

CREATE TABLE "parts" (
  "id" uuid PRIMARY KEY,
  "sku_id" uuid,
  "created_at" timestamp,
  "in_inventory" boolean,
  "quantity" int
);

CREATE TABLE "part_market_data" (
  "id" uuid PRIMARY KEY,
  "part_id" uuid,
  "purchase_price" numeric,
  "sell_price" numeric
);

CREATE TABLE "vehicle_parts_catalog" (
  "vehicle_type_id" uuid,
  "part_id" uuid
);

CREATE TABLE "customer_orders" (
  "id" uuid PRIMARY KEY,
  "customer_id" uuid,
  "vehicle_id" uuid,
  "client_order_description" text,
  "created_at" timestamp
);

CREATE TABLE "workshop_orders" (
  "id" uuid PRIMARY KEY,
  "customer_order_id" uuid,
  "total_profit" numeric,
  "total_fixed_cost" numeric,
  "total_variable_cost" numeric,
  "state" order_state,
  "date_created" timestamp,
  "days_queued" int,
  "max_days" int
);

CREATE TABLE "jobs" (
  "id" uuid PRIMARY KEY,
  "total_profit" numeric,
  "total_fixed_cost" numeric,
  "job_type" enum,
  "max_days" int
);

CREATE TABLE "order_jobs" (
  "id" uuid PRIMARY KEY,
  "order_id" uuid,
  "job_id" uuid
);

CREATE TABLE "job_parts" (
  "id" uuid PRIMARY KEY,
  "job_id" uuid,
  "sku_id" uuid
);

CREATE TABLE "profit_loss" (
  "id" uuid PRIMARY KEY,
  "date" timestamp,
  "total_profit" numeric,
  "order_id" uuid
);

COMMENT ON TABLE "vehicle_parts_catalog" IS 'PK: (vehicle_type_id, part_id)';

ALTER TABLE "vehicles" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "vehicles" ADD FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle_types" ("id");

ALTER TABLE "parts" ADD FOREIGN KEY ("sku_id") REFERENCES "skus" ("id");

ALTER TABLE "part_market_data" ADD FOREIGN KEY ("part_id") REFERENCES "parts" ("id");

ALTER TABLE "vehicle_parts_catalog" ADD FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle_types" ("id");

ALTER TABLE "vehicle_parts_catalog" ADD FOREIGN KEY ("part_id") REFERENCES "skus" ("id");

ALTER TABLE "customer_orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "customer_orders" ADD FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id");

ALTER TABLE "workshop_orders" ADD FOREIGN KEY ("customer_order_id") REFERENCES "customer_orders" ("id");

ALTER TABLE "order_jobs" ADD FOREIGN KEY ("order_id") REFERENCES "workshop_orders" ("id");

ALTER TABLE "order_jobs" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id");

ALTER TABLE "job_parts" ADD FOREIGN KEY ("job_id") REFERENCES "jobs" ("id");

ALTER TABLE "job_parts" ADD FOREIGN KEY ("sku_id") REFERENCES "skus" ("id");

ALTER TABLE "profit_loss" ADD FOREIGN KEY ("order_id") REFERENCES "workshop_orders" ("id");
