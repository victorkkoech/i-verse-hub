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

    const { chain } = await req.json();

    // Generate a random wallet address (in production, you'd use proper key generation)
    const generateAddress = (chainType: string) => {
      const randomHex = Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      if (chainType === 'TRON') {
        return 'T' + randomHex.substring(0, 33);
      }
      return '0x' + randomHex;
    };

    const address = generateAddress(chain);

    // Check if wallet already exists for this user and chain
    const { data: existingWallet } = await supabaseClient
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .eq('chain', chain)
      .maybeSingle();

    if (existingWallet) {
      return new Response(JSON.stringify({ wallet: existingWallet }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user has any wallets
    const { data: allWallets } = await supabaseClient
      .from('wallets')
      .select('*')
      .eq('user_id', user.id);

    const isPrimary = !allWallets || allWallets.length === 0;

    // Create new wallet
    const { data: wallet, error: walletError } = await supabaseClient
      .from('wallets')
      .insert({
        user_id: user.id,
        chain,
        address,
        is_primary: isPrimary,
      })
      .select()
      .single();

    if (walletError) {
      console.error('Error creating wallet:', walletError);
      return new Response(JSON.stringify({ error: walletError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Add default token for this chain
    const defaultTokens: Record<string, any> = {
      'Ethereum': { symbol: 'ETH', name: 'Ethereum', decimals: 18 },
      'BSC': { symbol: 'BNB', name: 'Binance Coin', decimals: 18 },
      'TRON': { symbol: 'TRX', name: 'TRON', decimals: 6 },
    };

    const token = defaultTokens[chain];
    if (token) {
      await supabaseClient
        .from('tokens')
        .insert({
          wallet_id: wallet.id,
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals,
          balance: 0,
        });
    }

    console.log('Wallet created successfully:', wallet.id);

    return new Response(JSON.stringify({ wallet }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in create-wallet function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
