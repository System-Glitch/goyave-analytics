CREATE VIEW per_page AS (
    WITH last_month AS (
        SELECT uri FROM pageviews WHERE viewed_at >= 'now'::timestamp - '1 MONTH'::interval
    )
    SELECT uri, COUNT(*) FROM last_month GROUP BY uri
);