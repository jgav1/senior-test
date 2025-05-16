Table customers {
  id uuid [pk]
  name text
  lastname text
  email text [unique]
}

Table vehicle_types {
  id uuid [pk]
  model text
  company text
  year int
  version text
}

Table vehicles {
  id uuid [pk]
  customer_id uuid [ref: > customers.id]
  vehicle_type_id uuid [ref: > vehicle_types.id]
  license_plate text [unique]
  vin text
}

Table skus {
  id uuid [pk]
  sku_value text [unique]
  size part_size
  description text
}

Enum part_size {
  xxs
  xs
  s
  m
  l
  xl
}

Table parts {
  id uuid [pk]  
  sku_id uuid [ref: > skus.id]
  created_at timestamp
  in_inventory boolean
}

Table part_market_data {
  id uuid [pk]
  part_id uuid [ref: > parts.id]
  purchase_price numeric
  sell_price numeric
}

Table misc_settings {
  id uuid [pk]
  base_cost_per_volume_unit_per_day numeric
  days_per_year int
  approx_volume_units int
  rent_cost_per_year numeric
  parallel_order_capacity int
}

Table inventory_constraints {
  id uuid [pk]
  storage_volume_percentage numeric
  price_per_year numeric
}

Table inventory {
  id uuid [pk]
  sku_id uuid [ref: > skus.id]
  quantity int
  inventory_constraints_id uuid [ref: > inventory_constraints.id]
  entry_date timestamp
}

Table vehicle_parts_catalog {
  vehicle_type_id uuid [ref: > vehicle_types.id]
  part_id uuid [ref: > parts.id]
  Note: 'PK: (vehicle_type_id, part_id)'
}

Enum order_state {
  created
  in_progress
  completed
}

Table customer_orders {
  id uuid [pk]
  customer_id uuid [ref: > customers.id]
  vehicle_id uuid [ref: > vehicles.id]
  client_order_description text
  created_at timestamp
}

Table workshop_orders {
  id uuid [pk]
  customer_order_id uuid [ref: > customer_orders.id]
  total_profit numeric
  total_fixed_cost numeric
  total_variable_cost numeric
  state order_state
  date_created timestamp
  days_queued int
}

Enum job_type{
  direct_sale
  reparation
}

Table jobs {
  id uuid [pk]
  total_profit numeric
  total_fixed_cost numeric
  job_type enum
}

Table order_jobs {
  id uuid [pk]
  order_id uuid [ref: > workshop_orders.id]
  job_id uuid [ref: > jobs.id]
}

Table job_parts {
  id uuid [pk]
  job_id uuid [ref: > jobs.id]
  sku_id uuid [ref: > skus.id]
}

Table profit_loss {
  id uuid [pk]
  date timestamp
  total_profit numeric
  order_id uuid [ref: > workshop_orders.id]
}