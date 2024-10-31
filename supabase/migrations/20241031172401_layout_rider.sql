create or replace function rider_layout_q() returns jsonb as $$
declare
  processing_result jsonb;
  status_result jsonb;
begin
  with processing_data as (
    select * 
    from processing_list_tb where rider_user_id is null
    order by created_at asc
  )

  select json_agg(row_to_json(processing_data)) into processing_result from processing_data;

  with status_data as (
    select *
    from processing_list_tb where rider_user_id = auth.uid()
    order by created_at asc
  )

  select json_agg(row_to_json(status_data)) into status_result from status_data;

  return jsonb_build_object(
    'processings', coalesce(processing_result, '[]'::jsonb),
    'status', coalesce(status_result, '[]'::jsonb)
  );
end;  
$$ language plpgsql;