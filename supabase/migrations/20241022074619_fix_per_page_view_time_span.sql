CREATE OR REPLACE VIEW per_page WITH (security_invoker = on) AS (
    WITH last_month AS (
        SELECT uri FROM pageviews WHERE viewed_at >= NOW() - '1 MONTH'::interval
    )
    SELECT uri, COUNT(*) FROM last_month GROUP BY uri
);