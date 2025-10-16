import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Send, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Wallet = () => {
  const { toast } = useToast();

  const chains = [
    { name: "Ethereum", symbol: "ETH", balance: "0.00", address: "0x...", color: "from-blue-500 to-purple-500" },
    { name: "BSC", symbol: "BNB", balance: "0.00", address: "0x...", color: "from-yellow-500 to-orange-500" },
    { name: "TRON", symbol: "TRX", balance: "0.00", address: "T...", color: "from-red-500 to-pink-500" },
  ];

  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "0.0000", value: "$0.00", change: "+0.00%" },
    { symbol: "USDT", name: "Tether USD", balance: "0.00", value: "$0.00", change: "+0.00%" },
  ];

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({ title: "Address copied!", description: "Wallet address copied to clipboard" });
  };

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
          <Button className="bg-gradient-primary hover:opacity-90 shadow-glow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Wallet
          </Button>
        </div>

        {/* Chain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chains.map((chain) => (
            <Card
              key={chain.symbol}
              className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass hover:shadow-glow-primary transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${chain.color}`} />
                      {chain.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{chain.symbol}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-success text-success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">{chain.balance}</p>
                  <p className="text-sm text-muted-foreground">{chain.symbol}</p>
                </div>
                <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
                  <code className="text-xs flex-1 truncate">{chain.address}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => copyAddress(chain.address)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Send className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <QrCode className="w-3 h-3 mr-1" />
                    Receive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Token List */}
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
          <CardHeader>
            <CardTitle>Token Holdings</CardTitle>
            <CardDescription>Your cryptocurrency portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                      <span className="text-sm font-bold">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{token.symbol}</p>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{token.balance} {token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.value}</p>
                  </div>
                  <Badge variant={token.change.startsWith('+') ? 'default' : 'destructive'}>
                    {token.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Wallet;
