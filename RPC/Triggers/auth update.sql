-- inserts a row into public.profiles
create function on_auth_user_updated()
returns trigger as $$
declare
  role_var varchar;
begin
  
  role_var := new.raw_user_meta_data ->> 'role';

  if role_var = 'Rider' then
    update public.rider_list_tb
    set user_meta_data = new.raw_user_meta_data
    where user_id = new.id; 
    return new;

  elsif role_var = 'Entrepreneur' then
    update public.entrepreneur_list_tb
    set user_meta_data = new.raw_user_meta_data
    where user_id = new.id; 
    return new;

  elsif role_var = 'Farmer' then
    update public.farmer_list_tb
    set user_meta_data = new.raw_user_meta_data
    where user_id = new.id; 
    return new; 
  elsif role_var = 'Admin' then
    return new;
  else
    raise exception 'You are not authorized: role "%" is invalid.', role_var;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_updated
after update on auth.users
for each row execute procedure on_auth_user_updated();

