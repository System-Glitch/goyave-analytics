CREATE VIEW overall AS (
    WITH last_month AS (
        SELECT DATE_TRUNC('day', viewed_at) AS viewed_at FROM pageviews WHERE viewed_at >= 'now'::timestamp - '1 MONTH'::interval
    )
    SELECT viewed_at, COUNT(*) FROM last_month GROUP BY viewed_at
);