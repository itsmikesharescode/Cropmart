create or replace view product_farmer_view as
select
  p.id,
  p.user_id,
  p.created_at,
  p.name,
  p.price,
  p.quantity,
  p.category,
  p.img_link,
  f.user_meta_data
from product_list_tb as p
left join farmer_list_tb as f
on p.user_id = f.user_id