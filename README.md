# Goyave analytics

Custom light analytics service for Goyave docs website, only collecting page views.

Using:
- Supabase
- Vue

## Supabase

- Start supabase local development containers with `supabase start`.
- Start supabase edge functions with `supabase functions serve`.

## Vue dashboard

```
cd dashboard
nvm use
npm install
cp .env.dev .env.local
npm run dev
```

## Deploy

The Github Action workflows run and automatically deploy functions, migrations as well as the dashboard app on Github Pages.