create or replace function search_products(query_input text)
returns jsonb as $$
declare
    normalized_query text;
begin
    -- normalize and prepare the input query to lowercase
    normalized_query := lower(regexp_replace(query_input, '[^a-z0-9 ]', '', 'g'));

    -- use ilike for flexible searching
    return (
        select jsonb_agg(result)
        from (
            select product.*, farmer.user_meta_data
            from product_list_tb as product
            left join farmer_list_tb as farmer on product.user_id = farmer.user_id
            where
                lower(product.name) ilike '%' || normalized_query || '%'
            order by
                product.created_at asc
        ) as result
    );
end;
$$ language plpgsql;
