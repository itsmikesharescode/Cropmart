create or replace function get_monthly_status_counts()
returns jsonb as $$
declare
    ongoing_result jsonb;
    delivered_result jsonb;
begin
    -- Get ongoing counts
    select jsonb_agg(
        jsonb_build_object(
            'date', to_char(ds.day, 'YYYY-MM-DD'),
            'count', coalesce(counts.count, 0)
        )
        order by ds.day
    ) into ongoing_result
    from (
        -- Generate series for last 30 days
        select generate_series(
            current_date - interval '29 days',
            current_date,
            interval '1 day'
        )::date as day
    ) ds
    left join (
        select 
            date_trunc('day', created_at)::date as date,
            count(*) as count
        from processing_list_tb
        where status = 'On-going'
        and created_at >= current_date - interval '29 days'
        group by date_trunc('day', created_at)::date
    ) counts on ds.day = counts.date;

    -- Get delivered counts
    select jsonb_agg(
        jsonb_build_object(
            'date', to_char(ds.day, 'YYYY-MM-DD'),
            'count', coalesce(counts.count, 0)
        )
        order by ds.day
    ) into delivered_result
    from (
        -- Generate series for last 30 days
        select generate_series(
            current_date - interval '29 days',
            current_date,
            interval '1 day'
        )::date as day
    ) ds
    left join (
        select 
            date_trunc('day', created_at)::date as date,
            count(*) as count
        from processing_list_tb
        where status = 'Delivered'
        and created_at >= current_date - interval '29 days'
        group by date_trunc('day', created_at)::date
    ) counts on ds.day = counts.date;

    -- Return the final result
    return jsonb_build_object(
        'total_ongoing', coalesce(ongoing_result, '[]'::jsonb),
        'total_delivered', coalesce(delivered_result, '[]'::jsonb)
    );
end;
$$ language plpgsql;