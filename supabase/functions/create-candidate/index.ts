import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { emailId, name } = await req.json();

  const candidate = {
    emailId,
    name
  };

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))

  const response = await supabase
    .from('candidate')
    .insert(candidate)
    .select();
  const { error } = response;
  let candidateData = response.data;
  try {

    if (error?.code === DatabaseCode.ALREADY_EXISTS) {
      const { data, error } = await supabase.from('candidate').select().eq('emailId', candidate.emailId);
      if (error) {
        throw error;
      }
      candidateData = data;
    } else if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(candidatedata ? data[0] : null),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": 'application/json' },
      status: 400,
    })
  }
})
