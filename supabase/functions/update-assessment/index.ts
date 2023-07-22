import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { verifyJWT } from '../_shared/jwt.ts'


serve(async (req: Request) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { id, exam_id, challenge_id, candidate_id, language, code } = await req.json();


  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))

  try {
    const token = getToken(req);
    await verifyJWT(token);

    if (id) {
      const { data, error } = await supabase.from('assessment').update({
        language,
        code
      }).eq('id', id).select();
      if (error) {
        throw error;
      }

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const { data, error } = await supabase.from('assessment').insert({
      exam_id,
      challenge_id,
      candidate_id,
      joined: new Date(),
      status: Status.JOINED,
      language: language ?? null,
      code: code ?? null,
    }).select();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": 'application/json' },
      status: 400,
    })
  }
})

const getToken = (req: Request) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('Missing token');
  }
  return token;
}


export enum Status {
  JOINED = 1,
  SUBMITTED = 2,
}
