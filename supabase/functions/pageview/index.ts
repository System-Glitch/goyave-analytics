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
