CREATE TABLE pageviews (
    uri CHARACTER VARYING(200) NOT NULL,
    viewed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX pageview_viewed_at_idx ON pageviews (viewed_at);
CREATE INDEX pageview_uri_idx ON pageviews (uri);