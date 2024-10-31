create or replace function insert_product(
  name_client text,
  price_client numeric,
  quantity_client numeric,
  category_client text,
  img_link text
) returns setof product_list_tb as $$
begin
  insert into product_list_tb (
    user_id,
    name, 
    price, 
    quantity, 
    category, 
    img_link
  )
  values(
    auth.uid(),
    name_client,
    price_client,
    quantity_client,
    category_client,
    img_link
  );

  return query
  select * from product_list_tb where user_id = auth.uid();
end;
$$ language plpgsql;