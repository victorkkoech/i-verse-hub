import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch wallets and tokens
      const { data: wallets } = await supabase
        .from('wallets')
        .select('*, tokens(*)');

      // Calculate total value
      let total = 0;
      wallets?.forEach(wallet => {
        wallet.tokens?.forEach((token: any) => {
          total += parseFloat(token.balance || 0) * (token.price_usd || 0);
        });
      });
      setTotalValue(total);

      // Fetch transactions
      const { data: txs } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setTransactions(txs || []);

      // Fetch AI insights
      const { data: insights } = await supabase
        .from('ai_insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (insights && insights.length > 0) {
        setAiAnalysis(insights[0].analysis);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAIInsights = async () => {
    setLoadingAI(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Please log in first", variant: "destructive" });
        return;
      }

      const { data, error } = await supabase.functions.invoke('ai-portfolio-analysis');

      if (error) throw error;

      setAiAnalysis(data.analysis);
      toast({ title: "Success", description: "AI insights generated!" });
    } catch (error: any) {
      console.error('Error getting AI insights:', error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to get AI insights", 
        variant: "destructive" 
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const getTokenInsights = async (tokenSymbol: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Please log in first", variant: "destructive" });
        return;
      }

      toast({ title: "Analyzing...", description: `Getting insights for ${tokenSymbol}` });

      const { data, error } = await supabase.functions.invoke('ai-token-insights', {
        body: { tokenSymbol }
      });

      if (error) throw error;

      toast({ 
        title: `${tokenSymbol} Analysis`, 
        description: data.analysis,
        duration: 10000,
      });
    } catch (error: any) {
      console.error('Error getting token insights:', error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to get token insights", 
        variant: "destructive" 
      });
    }
  };

  const chartData = [
    { name: "Mon", value: totalValue * 0.95 },
    { name: "Tue", value: totalValue * 0.97 },
    { name: "Wed", value: totalValue * 0.94 },
    { name: "Thu", value: totalValue * 0.98 },
    { name: "Fri", value: totalValue * 0.96 },
    { name: "Sat", value: totalValue * 0.99 },
    { name: "Sun", value: totalValue },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <p className="text-center text-muted-foreground">Loading portfolio...</p>
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
              Portfolio Analytics
            </h1>
            <p className="text-muted-foreground mt-2">Track your crypto performance with AI insights</p>
          </div>
          <Button 
            className="bg-gradient-accent hover:opacity-90 shadow-glow-accent"
            onClick={getAIInsights}
            disabled={loadingAI}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {loadingAI ? 'Analyzing...' : 'Get AI Insights'}
          </Button>
        </div>

        {/* Performance Chart */}
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Portfolio Performance
            </CardTitle>
            <CardDescription>7-day trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Value", value: `$${totalValue.toFixed(2)}`, change: "+5.2%" },
            { label: "24h Change", value: `$${(totalValue * 0.052).toFixed(2)}`, change: "+5.2%" },
            { label: "Best Performer", value: "ETH", change: "+8.4%" },
            { label: "Total Transactions", value: transactions.length.toString(), change: "" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass"
            >
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                      {stat.change}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        {aiAnalysis && (
          <Card className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glow-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Portfolio Analysis
              </CardTitle>
              <CardDescription>Powered by advanced AI analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
            </CardContent>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest crypto activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'receive' ? 'bg-success/20' : 'bg-destructive/20'
                      }`}>
                        {tx.type === 'receive' ? (
                          <ArrowDownRight className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        tx.type === 'receive' ? 'text-success' : 'text-destructive'
                      }`}>
                        {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token_symbol}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => getTokenInsights(tx.token_symbol)}
                        className="text-xs mt-1"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Get Insights
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No transactions yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Portfolio;
