CREATE OR REPLACE VIEW overall WITH (security_invoker = on) AS (
    WITH days AS (
        SELECT * FROM GENERATE_SERIES(DATE_TRUNC('day', LOCALTIMESTAMP - '1 MONTH'::interval), DATE_TRUNC('day', LOCALTIMESTAMP), '1 day') viewed_at ORDER BY 1
    ),
    last_month AS (
        SELECT DATE_TRUNC('day', viewed_at) AS viewed_at FROM pageviews WHERE viewed_at >= LOCALTIMESTAMP - '1 MONTH'::interval
    ),
    consolidated AS (
        SELECT viewed_at, COUNT(*) views FROM last_month GROUP BY viewed_at
        UNION ALL
        SELECT viewed_at, 0 views FROM days
    )
    SELECT viewed_at, SUM(views)::bigint count FROM consolidated GROUP BY viewed_at ORDER BY viewed_at
);