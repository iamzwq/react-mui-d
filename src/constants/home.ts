export const expected_expand_count = 30;

export const defaultSortBy = {
  group_columns: [
    { column: "client_name", reversed_order: false },
    { column: "product_name", reversed_order: false }
  ],
  sort_column: { column: "status", reversed_order: false }
};

export const sort_by_options: { id: string; name: string }[] = [
  { name: "Client", id: "client_name" },
  { name: "Job Number", id: "job_number" },
  { name: "Client Product", id: "product_name" },
  { name: "Job Status", id: "status" }
];

export const group_by_options: { id: string; name: string }[] = [
  { id: "client_name", name: "Client" },
  { id: "product_name", name: "Client Product" },
  { id: "ods_product_type", name: "ODS Product" },
  { id: "plant_location", name: "Plant Location" },
  { id: "platform", name: "Platform" },
  { id: "ship_type", name: "Ship Type" },
  { id: "sla_days", name: "SLA Days" }
];
