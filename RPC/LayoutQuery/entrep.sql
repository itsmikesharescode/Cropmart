create or replace function entrepreneur_layout_q() returns jsonb as $$
declare
  product_result jsonb;
  category_result jsonb;
  bookmark_result jsonb;
  processing_result jsonb;
begin
  with product_data as (
    select product.*, farmer.user_meta_data 
    from product_list_tb as product 
    left join farmer_list_tb as farmer on product.user_id = farmer.user_id
    order by created_at asc
  )

  select json_agg(row_to_json(product_data)) into product_result from product_data;

  with category_data as (
    select * from category_list_tb order by created_at asc
  )

  select json_agg(row_to_json(category_data)) into category_result from category_data;

  with bookmark_data as (
    select * from bookmark_product_view
    where auth.uid() = user_id
    order by created_at asc
  )

  select json_agg(row_to_json(bookmark_data)) into bookmark_result from bookmark_data;


  with processing_data as (
    select * from processing_list_tb
    where entrepreneur_user_id = auth.uid() 
    order by created_at asc
  )

  select json_agg(row_to_json(processing_data)) into processing_result from processing_data;

  return jsonb_build_object(
    'products', coalesce(product_result, '[]'::jsonb),
    'categories', coalesce(category_result, '[]'::jsonb),
    'bookmarks', coalesce(bookmark_result, '[]'::jsonb),
    'processings', coalesce(processing_result, '[]'::jsonb)
  );
end;
$$ language plpgsql;
