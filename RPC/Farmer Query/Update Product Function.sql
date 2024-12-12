create or replace function update_product(
  product_id_client int8,
  name_client text,
  price_client numeric,
  quantity_client numeric,
  category_client text,
  img_link_client text
) returns setof product_list_tb as $$
begin
  update product_list_tb
  set 
    name = name_client,
    price = price_client,
    quantity = quantity_client,
    category = category_client,
    img_link = img_link_client
  where 
    id = product_id_client 
    and user_id = auth.uid();

  return query
  select * from product_list_tb where user_id = auth.uid();
end;
$$ language plpgsql;