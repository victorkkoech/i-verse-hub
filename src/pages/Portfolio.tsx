import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Sparkles } from "lucide-react";

const Portfolio = () => {
  const chartData = [
    { name: "Mon", value: 0 },
    { name: "Tue", value: 0 },
    { name: "Wed", value: 0 },
    { name: "Thu", value: 0 },
    { name: "Fri", value: 0 },
    { name: "Sat", value: 0 },
    { name: "Sun", value: 0 },
  ];

  const transactions = [
    { type: "Receive", token: "ETH", amount: "+0.0000", value: "$0.00", time: "Just now" },
    { type: "Send", token: "USDT", amount: "-0.00", value: "$0.00", time: "1 hour ago" },
  ];

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
          <Button className="bg-gradient-accent hover:opacity-90 shadow-glow-accent">
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Insights
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
            { label: "Total Value", value: "$0.00", change: "+0%" },
            { label: "24h Change", value: "$0.00", change: "+0%" },
            { label: "Best Performer", value: "N/A", change: "+0%" },
            { label: "Total Trades", value: "0", change: "All time" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glass">
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transaction History */}
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-semibold">{tx.type} {tx.token}</p>
                    <p className="text-sm text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.amount.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {tx.amount} {tx.token}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Section */}
        <Card className="border-border/50 backdrop-blur-xl bg-gradient-to-br from-card to-primary/5 shadow-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Get personalized recommendations for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your wallet and start trading to receive AI-powered insights and recommendations tailored to your investment strategy.
              </p>
              <Button className="bg-gradient-accent hover:opacity-90 shadow-glow-accent">
                Analyze Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Portfolio;
