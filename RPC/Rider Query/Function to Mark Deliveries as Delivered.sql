create or replace function mark_as_delivered(
  process_id_input int8
) returns setof processing_list_tb as $$
begin
  update processing_list_tb
  set status = 'Delivered'
  where id = process_id_input
  and rider_user_id = auth.uid();

  return query
  select * from processing_list_tb
  where rider_user_id = auth.uid()
  order by created_at asc;
end;
$$ language plpgsql;
