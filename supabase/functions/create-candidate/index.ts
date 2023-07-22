import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { createJWT } from '../_shared/jwt.ts'

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

  try {

    const token = await createJWT(candidate)

    const response = await supabase
      .from('candidate')
      .insert({
        ...candidate,
        token
      })
      .select();
    const { error } = response;
    let candidateData = response.data;

    if (error?.code === DatabaseCode.ALREADY_EXISTS) {
      // update the candidate with token if already exists
      const { data, error } = await supabase
        .from('candidate')
        .update({
          token
        })
        .eq('emailId', emailId)
        .select();

      if (error) throw error;
      candidateData = data;
    } else if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(candidateData ? candidateData[0] : null),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": 'application/json' },
      status: 400,
    })
  }
})

enum DatabaseCode {
  ALREADY_EXISTS = '23505',
}