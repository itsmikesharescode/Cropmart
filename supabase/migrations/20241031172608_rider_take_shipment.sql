create or replace function take_shipment(
  process_id_input int4
) returns setof processing_list_tb as $$
begin
  update processing_list_tb
  set
    status = 'On-going',
    rider_user_id = auth.uid()
  where id = process_id_input;

  return query
  select * from processing_list_tb
  where rider_user_id = auth.uid()
  order by created_at asc;
end;
$$ language plpgsql;
