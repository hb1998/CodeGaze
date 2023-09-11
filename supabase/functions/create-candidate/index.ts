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
      const toTime = (date) => new Date(date).getTime();

      const { data: candidateRecord } = await supabase.from('candidate').select('*, assessment(*)').eq('emailId', candidate.emailId);
      const assessments = candidateRecord[0].assessment || [];
      const latestAssessment = assessments.reduce((prev, current) => (toTime(prev.created_at) > toTime(current.created_at)) ? prev : current);
      const cooldownPeriod = 1000 * 60 * 60 * 24 * 30 * 6; // 6 months in milliseconds;
      const isCooldownPeriodOver = (new Date().getTime() - toTime(latestAssessment.created_at)) > cooldownPeriod;
      if (isCooldownPeriodOver) {
        // update the candidate with token if already exists
        const { data, error } = await supabase
          .from('candidate')
          .update({
            token
          })
          .eq('emailId', candidate.emailId)
          .select();

        if (error) throw error;
        candidateData = data;
      } else {
        throw new Error('You can only take the assessment once every 6 months');
      }
    }


    return new Response(
      JSON.stringify(candidateData ? candidateData[0] : null),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": 'application/json' },
      status: 400,
    })
  }
})

enum DatabaseCode {
  ALREADY_EXISTS = '23505',
}