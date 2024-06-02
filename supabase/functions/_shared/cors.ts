export const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ORIGIN_URL')!,
  'Access-Control-Allow-Headers': 'x-client-info, content-type, referer', // TODO add the necessary headers
}