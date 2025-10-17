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

    const { walletId, toAddress, amount, tokenSymbol } = await req.json();

    // Validate inputs
    if (!walletId || !toAddress || !amount || !tokenSymbol) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify wallet ownership
    const { data: wallet, error: walletError } = await supabaseClient
      .from('wallets')
      .select('*, tokens(*)')
      .eq('id', walletId)
      .eq('user_id', user.id)
      .single();

    if (walletError || !wallet) {
      return new Response(JSON.stringify({ error: 'Wallet not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Find the token
    const token = wallet.tokens.find((t: any) => t.symbol === tokenSymbol);
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token not found in wallet' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check balance
    if (parseFloat(token.balance) < parseFloat(amount)) {
      return new Response(JSON.stringify({ error: 'Insufficient balance' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate mock transaction hash
    const txHash = '0x' + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    // Calculate fee (0.1% of amount)
    const fee = (parseFloat(amount) * 0.001).toString();

    // Create transaction record
    const { data: transaction, error: txError } = await supabaseClient
      .from('transactions')
      .insert({
        wallet_id: walletId,
        type: 'send',
        from_address: wallet.address,
        to_address: toAddress,
        amount,
        token_symbol: tokenSymbol,
        tx_hash: txHash,
        fee,
        status: 'completed',
      })
      .select()
      .single();

    if (txError) {
      console.error('Error creating transaction:', txError);
      return new Response(JSON.stringify({ error: txError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update token balance
    const newBalance = (parseFloat(token.balance) - parseFloat(amount) - parseFloat(fee)).toString();
    await supabaseClient
      .from('tokens')
      .update({ balance: newBalance })
      .eq('id', token.id);

    console.log('Transaction created successfully:', transaction.id);

    return new Response(JSON.stringify({ transaction }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-transaction function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
