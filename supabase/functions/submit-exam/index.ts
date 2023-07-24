import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { verifyJWT } from '../_shared/jwt.ts'
import { Status } from "../_shared/common.ts"


serve(async (req: Request) => {

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { id, language, code, result } = await req.json();


  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))

  try {
    const token = getToken(req);
    await verifyJWT(token);

    const { data: assessment, error: assessmentError } = await supabase.from('assessment').select().eq('id', id).single();
    if (assessmentError) {
      throw assessmentError;
    }
    if (assessment?.status === Status.SUBMITTED) {
      throw new Error('Assessment already submitted');
    }

    if (assessment?.status !== Status.JOINED) {
      throw new Error('Assessment not joined');
    }
    removeCandidateToken(supabase, assessment.candidate_id);

    const { data, error } = await supabase.from('assessment').update({
      language,
      code,
      status: Status.SUBMITTED,
      finished: new Date(),
      result
    }).eq('id', id).select();
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

const removeCandidateToken = async (supabase: any, candidateId: number) => {
  const { error } = await supabase.from('candidate').update({
    token: null
  }).eq('id', candidateId).select();
  if (error) {
    throw error;
  }
}


const getToken = (req: Request) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('Missing token');
  }
  return token;
}


