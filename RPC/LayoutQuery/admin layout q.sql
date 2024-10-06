create or replace function admin_layout_q() returns jsonb as $$
declare
  product_result jsonb;
  category_result jsonb;
  farmer_result jsonb;
  entrep_result jsonb;
  rider_result jsonb;
begin
  with product_data as (
    select * from product_farmer_view order by user_id asc
  )
  select json_agg(row_to_json(product_data)) into product_result from product_data;

  with category_data as (
    select * from category_list_tb order by name asc
  )
  select json_agg(row_to_json(category_data)) into category_result from category_data;

  with farmer_data as (
    select * from farmer_list_tb order by created_at asc
  )
  select json_agg(row_to_json(farmer_data)) into farmer_result from farmer_data;

  with entrep_data as (
    select * from entrepreneur_list_tb order by created_at asc
  )
  select json_agg(row_to_json(entrep_data)) into entrep_result from entrep_data;

  with rider_data as (
    select * from rider_list_tb order by created_at asc
  )
  select json_agg(row_to_json(rider_data)) into rider_result from rider_data;

   return jsonb_build_object(
    'products', coalesce(product_result, '[]'::jsonb),
    'categories', coalesce(category_result, '[]'::jsonb),
    'farmers', coalesce(farmer_result, '[]'::jsonb),
    'entrepreneurs', coalesce(entrep_result, '[]'::jsonb),
    'riders', coalesce(rider_result, '[]'::jsonb)
   );
end;
$$ language plpgsql;