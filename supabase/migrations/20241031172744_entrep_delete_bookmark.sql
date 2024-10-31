create or replace function delete_bookmark(
  bookmark_id_client numeric
) returns setof bookmark_product_view as $$
begin
  delete from bookmark_list_tb where id = bookmark_id_client;

  return query
  select * from bookmark_product_view
  where user_id = auth.uid()
  order by created_at asc;
end;
$$ language plpgsql;