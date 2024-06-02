// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

const REFERRER = Deno.env.get('ORIGIN_URL')!

Deno.serve(async (req) => {
  try {

    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const referrer = req.headers.get('referer')
    if (!referrer || !referrer.startsWith(REFERRER)) {
      return new Response(null, {status: 204, headers: { ...corsHeaders }})
    }
    const body = await req.json()
    const page = body.page?.trim() || ''
    if (!page) {
      return new Response(null, {status: 204, headers: { ...corsHeaders }})
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { error } = await supabase.from('pageviews').insert({uri: page})

    if (error) {
      throw error
    }

    return new Response(null, {
      headers: { ...corsHeaders },
      status: 201,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500, headers: { ...corsHeaders } })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/pageview' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
