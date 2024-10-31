create function on_auth_user_created()
returns trigger as $$
declare
  role_var varchar;
begin

  role_var := new.raw_user_meta_data ->> 'role';

  if role_var = 'Rider' then
    insert into public.rider_list_tb (user_id, user_meta_data)
    values (
      new.id, 
      new.raw_user_meta_data
    );
    insert into public.role_tb (user_id, role) values(new.id, role_var);
    return new;

  elsif role_var = 'Entrepreneur' then
    insert into public.entrepreneur_list_tb (user_id, user_meta_data)
    values (
      new.id,
      new.raw_user_meta_data
    );
    insert into public.role_tb (user_id, role) values(new.id, role_var);
    return new;

  elsif role_var = 'Farmer' then
    insert into public.farmer_list_tb (user_id, user_meta_data)
    values (
      new.id,
      new.raw_user_meta_data
    );
    insert into public.role_tb (user_id, role) values(new.id, role_var);
    return new;
  elsif role_var = 'Admin' then
    return new;
  else
    raise exception 'You are not authorized: role "%" is invalid.', role_var;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure on_auth_user_created();
