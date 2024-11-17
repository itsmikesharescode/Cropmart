create or replace function is_farmer() returns boolean as $$
begin
  return exists(
    select 1 from role_tb where user_id = auth.uid() and role = 'Farmer'
  );
end;
$$ language plpgsql security definer;