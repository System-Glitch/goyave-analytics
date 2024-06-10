# Goyave analytics

Custom light analytics service for Goyave docs website, only collecting page views.

Using:
- Supabase
- Vue

## Supabase

- `cp supabase/.env.local supabase/.env`
- Start supabase local development containers with `supabase start`.
- Start supabase edge functions with `supabase functions serve`.
- You can check the local Supabase dashboard at `http://localhost:54323/project/default`.
- The pageview function can be called at `POST http://127.0.0.1:54321/functions/v1/pageview` with a JSON body:
```json
{"page": "/introduction.html"}
```

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