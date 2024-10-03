create or replace function insert_purchase(
  purchase_obj_input jsonb
) returns setof processing_list_tb as $$
declare
  cart_item jsonb;
  farmer_user_id_input uuid;
  product_id_input bigint;
begin

  for cart_item in select * from jsonb_array_elements(purchase_obj_input) loop
    farmer_user_id_input := (cart_item->>'user_id')::uuid;
    product_id_input := (cart_item->>'id')::bigint;

    insert into processing_list_tb (
      farmer_user_id, 
      entrepreneur_user_id, 
      product_id, 
      product_obj
    )
    values(
      farmer_user_id_input, 
      auth.uid(),
      product_id_input,
      cart_item
    );
  end loop;

  return query
  select * from processing_list_tb 
  where entrepreneur_user_id = auth.uid()
  order by created_at asc;
end;
$$ language plpgsql;
