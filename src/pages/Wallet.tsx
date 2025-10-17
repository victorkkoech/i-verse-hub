import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Plus, Send, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Wallet = () => {
  const { toast } = useToast();
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [sendForm, setSendForm] = useState({ toAddress: "", amount: "", tokenSymbol: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('wallets')
        .select('*, tokens(*)')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setWallets(data || []);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      toast({ title: "Error", description: "Failed to load wallets", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const createWallet = async (chain: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Please log in first", variant: "destructive" });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-wallet', {
        body: { chain }
      });

      if (error) throw error;

      toast({ title: "Success", description: `${chain} wallet created successfully!` });
      fetchWallets();
    } catch (error: any) {
      console.error('Error creating wallet:', error);
      toast({ title: "Error", description: error.message || "Failed to create wallet", variant: "destructive" });
    }
  };

  const sendTransaction = async () => {
    if (!selectedWallet || !sendForm.toAddress || !sendForm.amount || !sendForm.tokenSymbol) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('send-transaction', {
        body: {
          walletId: selectedWallet.id,
          toAddress: sendForm.toAddress,
          amount: sendForm.amount,
          tokenSymbol: sendForm.tokenSymbol,
        }
      });

      if (error) throw error;

      toast({ title: "Success", description: "Transaction sent successfully!" });
      setSendDialogOpen(false);
      setSendForm({ toAddress: "", amount: "", tokenSymbol: "" });
      fetchWallets();
    } catch (error: any) {
      console.error('Error sending transaction:', error);
      toast({ title: "Error", description: error.message || "Failed to send transaction", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: "Address copied!", description: "Wallet address copied to clipboard" });
  };

  const chainColors: Record<string, string> = {
    'Ethereum': 'from-blue-500 to-purple-500',
    'BSC': 'from-yellow-500 to-orange-500',
    'TRON': 'from-red-500 to-pink-500',
  };

  const chainSymbols: Record<string, string> = {
    'Ethereum': 'ETH',
    'BSC': 'BNB',
    'TRON': 'TRX',
  };

  const availableChains = ['Ethereum', 'BSC', 'TRON'];

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <p className="text-center text-muted-foreground">Loading wallets...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Multi-Chain Wallet
            </h1>
            <p className="text-muted-foreground mt-2">Manage your assets across multiple blockchains</p>
          </div>
        </div>

        {/* Chain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableChains.map((chain) => {
            const wallet = wallets.find(w => w.chain === chain);
            const mainToken = wallet?.tokens?.find((t: any) => t.symbol === chainSymbols[chain]);

            return (
              <Card
                key={chain}
                className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass hover:shadow-glow-primary transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${chainColors[chain]}`} />
                        {chain}
                      </CardTitle>
                      <CardDescription className="mt-2">{chainSymbols[chain]}</CardDescription>
                    </div>
                    {wallet && <Badge variant="outline" className="border-success text-success">Active</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wallet ? (
                    <>
                      <div>
                        <p className="text-3xl font-bold">{mainToken?.balance || '0.00'}</p>
                        <p className="text-sm text-muted-foreground">{chainSymbols[chain]}</p>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
                        <code className="text-xs flex-1 truncate">{wallet.address}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => copyAddress(wallet.address)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedWallet(wallet);
                            setSendForm({ ...sendForm, tokenSymbol: chainSymbols[chain] });
                            setSendDialogOpen(true);
                          }}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => copyAddress(wallet.address)}
                        >
                          <QrCode className="w-3 h-3 mr-1" />
                          Receive
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-primary"
                      onClick={() => createWallet(chain)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create {chain} Wallet
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Token List */}
        {wallets.length > 0 && (
          <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
              <CardDescription>Your cryptocurrency portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wallets.flatMap(wallet => 
                  wallet.tokens?.map((token: any) => (
                    <div
                      key={`${wallet.id}-${token.id}`}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${chainColors[wallet.chain]}`} />
                        <div>
                          <p className="font-semibold">{token.name}</p>
                          <p className="text-sm text-muted-foreground">{token.symbol} • {wallet.chain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{token.balance} {token.symbol}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(parseFloat(token.balance) * (token.price_usd || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )) || []
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Send Transaction Dialog */}
        <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Transaction</DialogTitle>
              <DialogDescription>Send crypto to another address</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Recipient Address</Label>
                <Input
                  placeholder="0x..."
                  value={sendForm.toAddress}
                  onChange={(e) => setSendForm({ ...sendForm, toAddress: e.target.value })}
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendForm.amount}
                  onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                />
              </div>
              <div>
                <Label>Token</Label>
                <Input
                  value={sendForm.tokenSymbol}
                  disabled
                  className="bg-secondary/30"
                />
              </div>
              <Button 
                onClick={sendTransaction} 
                disabled={sending}
                className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-primary"
              >
                {sending ? 'Sending...' : 'Send Transaction'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Wallet;
