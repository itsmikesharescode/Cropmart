create or replace function is_entrepreneur() returns boolean as $$
begin
  return exists(
    select 1 from role_tb where user_id = auth.uid() and role = 'Entrepreneur'
  );
end;
$$ language plpgsql security definer;