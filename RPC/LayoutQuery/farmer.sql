create or replace function farmer_layout_q() returns jsonb as $$
declare
  product_result jsonb;
  processing_result jsonb;
  category_result jsonb;
begin
  with product_data as (
    select *
    from product_list_tb
    where user_id = auth.uid() 
    order by created_at asc
  )

  select json_agg(row_to_json(product_data)) into product_result from product_data;

  with processing_data as (
    select * from processing_list_tb 
    where farmer_user_id = auth.uid()
    order by created_at asc
  )

  select json_agg(row_to_json(processing_data)) into processing_result from processing_data;

  with category_data as (
    select * from category_list_tb order by created_at asc
  )

  select json_agg(row_to_json(category_data)) into category_result from category_data;

  return jsonb_build_object(
    'products', coalesce(product_result, '[]'::jsonb),
    'processings', coalesce(processing_result, '[]'::jsonb),
    'categories', coalesce(category_result, '[]'::jsonb)
  );
end;
$$ language plpgsql security definer;
