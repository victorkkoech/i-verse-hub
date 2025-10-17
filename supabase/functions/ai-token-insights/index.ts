import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { tokenSymbol } = await req.json();

    if (!tokenSymbol) {
      return new Response(JSON.stringify({ error: 'Token symbol is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Provide a brief analysis and recommendation for ${tokenSymbol} cryptocurrency. Include:
1. Current market sentiment
2. Key strengths and weaknesses
3. Short-term outlook (bullish/bearish/neutral)
4. One actionable recommendation
Keep it concise (3-4 sentences max).`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a crypto market analyst. Provide clear, concise insights.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const analysis = aiData.choices[0].message.content;

    // Determine sentiment and confidence
    const sentiment = analysis.toLowerCase().includes('bullish') ? 'bullish' : 
                     analysis.toLowerCase().includes('bearish') ? 'bearish' : 'neutral';
    const confidenceScore = Math.random() * 0.3 + 0.7; // 0.7-1.0 for demo

    // Save insight to database
    const { error: insertError } = await supabaseClient
      .from('ai_insights')
      .insert({
        user_id: user.id,
        token_symbol: tokenSymbol,
        analysis,
        recommendation: sentiment,
        confidence_score: confidenceScore,
      });

    if (insertError) {
      console.error('Error saving insight:', insertError);
    }

    console.log('Token insight generated for:', tokenSymbol);

    return new Response(JSON.stringify({ 
      analysis, 
      recommendation: sentiment,
      confidence_score: confidenceScore 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-token-insights function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
