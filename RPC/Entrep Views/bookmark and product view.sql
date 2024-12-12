create or replace view bookmark_product_view as
select 
  b.id,
  b.user_id,
  b.created_at,
  b.product_id,
  p.name,
  p.price,
  p.quantity,
  p.category,
  p.img_link,
  p.user_meta_data
from bookmark_list_tb as b
left join product_list_tb as p
on b.product_id = p.id