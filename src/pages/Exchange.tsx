import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Settings } from "lucide-react";
import { useState } from "react";

const Exchange = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const tokens = [
    { symbol: "ETH", name: "Ethereum", balance: "0.00" },
    { symbol: "USDT", name: "Tether USD", balance: "0.00" },
    { symbol: "BNB", name: "Binance Coin", balance: "0.00" },
    { symbol: "TRX", name: "TRON", balance: "0.00" },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Token Exchange
            </h1>
            <p className="text-muted-foreground mt-2">Swap tokens across multiple chains</p>
          </div>

          {/* Swap Card */}
          <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glow-primary">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Swap Tokens</CardTitle>
                  <CardDescription>Exchange cryptocurrencies instantly</CardDescription>
                </div>
                <Button size="sm" variant="ghost">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Token */}
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="h-14 text-2xl bg-secondary/30 border-border/50"
                    />
                  </div>
                  <Select defaultValue="ETH">
                    <SelectTrigger className="w-[140px] h-14 bg-secondary/30 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-primary" />
                            {token.symbol}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">Balance: 0.00 ETH</p>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full w-10 h-10 p-0 border-border/50 bg-card hover:bg-primary/20 hover:border-primary"
                >
                  <ArrowDownUp className="w-4 h-4" />
                </Button>
              </div>

              {/* To Token */}
              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="h-14 text-2xl bg-secondary/30 border-border/50"
                    />
                  </div>
                  <Select defaultValue="USDT">
                    <SelectTrigger className="w-[140px] h-14 bg-secondary/30 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-accent" />
                            {token.symbol}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">Balance: 0.00 USDT</p>
              </div>

              {/* Exchange Info */}
              <div className="space-y-2 p-4 rounded-lg bg-secondary/20 border border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-medium">1 ETH = 0.00 USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="font-medium">~$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slippage</span>
                  <span className="font-medium">0.5%</span>
                </div>
              </div>

              {/* Swap Button */}
              <Button className="w-full h-14 bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg">
                Connect Wallet to Swap
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Best Rates", desc: "Optimized prices" },
              { title: "Instant", desc: "Fast execution" },
              { title: "Secure", desc: "Protected swaps" },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/50 backdrop-blur-xl bg-gradient-card">
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Exchange;
