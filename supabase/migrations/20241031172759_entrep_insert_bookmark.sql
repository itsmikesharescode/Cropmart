create or replace function insert_bookmark(
  product_id_client numeric
) returns setof bookmark_product_view as $$
begin
  -- Check if the combination of user_id and product_id already exists
  if exists (
    select 1 
    from bookmark_list_tb 
    where user_id = auth.uid() 
      and product_id = product_id_client
  ) then
    -- Raise an exception if the bookmark already exists
    raise exception 'Bookmark already exists'
      using hint = 'Try inserting a new product or checking your bookmarks.';
  end if;

  -- Proceed with the insert if it does not exist
  insert into bookmark_list_tb (user_id, product_id)
  values(auth.uid(), product_id_client);

  -- Return the updated bookmark view for the current user
  return query
  select * from bookmark_product_view
  where user_id = auth.uid()
  order by created_at asc;

end;
$$ language plpgsql;
