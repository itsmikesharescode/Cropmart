create or replace function insert_purchase(
  purchase_obj_input jsonb,
  purchase_type_input text
) returns setof processing_list_tb as $$
declare
  cart_item jsonb;
  farmer_user_id_input uuid;
  product_id_input bigint;
begin

  for cart_item in select * from jsonb_array_elements(purchase_obj_input) loop
    farmer_user_id_input := (cart_item->>'user_id')::uuid;
    product_id_input := (cart_item->>'id')::bigint;

    if purchase_type_input = 'direct payment' then
      insert into processing_list_tb (
        farmer_user_id, 
        entrepreneur_user_id, 
        product_id, 
        product_obj,
        status,
        rider_user_id
      )
      values(
        farmer_user_id_input, 
        auth.uid(),
        product_id_input,
        cart_item,
        'Direct Paid',
        auth.uid()
      );
    else 
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
    end if;
  end loop;

  return query
  select * from processing_list_tb 
  where entrepreneur_user_id = auth.uid()
  order by created_at asc;
end;
$$ language plpgsql;
