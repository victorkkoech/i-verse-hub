import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, Coins, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Balance",
      value: "$0.00",
      description: "Across all chains",
      icon: Wallet,
      gradient: "from-primary to-purple-600",
    },
    {
      title: "Portfolio Value",
      value: "$0.00",
      description: "+0% this month",
      icon: TrendingUp,
      gradient: "from-accent to-blue-600",
    },
    {
      title: "Game Earnings",
      value: "0 Coins",
      description: "Total rewards earned",
      icon: Coins,
      gradient: "from-success to-green-600",
    },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to HOOD DeFi
          </h1>
          <p className="text-muted-foreground">
            Manage your multi-chain portfolio, trade tokens, and earn rewards
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Quick Actions
            </CardTitle>
            <CardDescription>Get started with your DeFi journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => navigate("/wallet")}
                className="bg-gradient-primary hover:opacity-90 shadow-glow-primary"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Setup Wallet
              </Button>
              <Button
                onClick={() => navigate("/portfolio")}
                variant="outline"
                className="border-border/50 hover:border-primary hover:bg-primary/10"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button
                onClick={() => navigate("/exchange")}
                variant="outline"
                className="border-border/50 hover:border-accent hover:bg-accent/10"
              >
                Swap Tokens
              </Button>
              <Button
                onClick={() => navigate("/games")}
                className="bg-gradient-accent hover:opacity-90 shadow-glow-accent"
              >
                <Coins className="w-4 h-4 mr-2" />
                Play & Earn
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glass">
            <CardHeader>
              <CardTitle>Multi-Chain Support</CardTitle>
              <CardDescription>Manage assets across Ethereum, BSC, and TRON</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect your wallets and manage all your crypto assets from a single, unified interface.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glass">
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Get intelligent recommendations for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes market trends and provides personalized token recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
