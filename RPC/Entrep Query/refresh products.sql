create or replace function refresh_products() returns jsonb as $$
declare
  product_result jsonb;
begin
  with product_data as (
    select product.*, farmer.user_meta_data 
    from product_list_tb as product 
    left join farmer_list_tb as farmer on product.user_id = farmer.user_id
    order by created_at asc
  )
  
  select json_agg(row_to_json(product_data)) into product_result from product_data;
  
  return coalesce(product_result, '[]'::jsonb);
end;
$$ language plpgsql;
