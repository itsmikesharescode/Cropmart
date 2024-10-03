create or replace function query_products(
  category_client text
) returns setof product_farmer_view as $$
begin
  return query
  select * from product_farmer_view
  where category = category_client
  order by created_at asc;
end;
$$ language plpgsql;