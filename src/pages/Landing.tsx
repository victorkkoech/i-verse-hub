import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, Coins, Shield, Zap, Users, ArrowRight, Gamepad2 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wallet,
      title: "Multi-Chain Wallet",
      description: "Manage assets across Ethereum, BSC, and TRON from one unified interface",
      gradient: "from-primary to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Smart Portfolio",
      description: "AI-powered insights and analytics to optimize your crypto investments",
      gradient: "from-accent to-blue-600",
    },
    {
      icon: Gamepad2,
      title: "Play & Earn",
      description: "Earn real crypto rewards through blockchain-powered games",
      gradient: "from-success to-green-600",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your assets are protected with industry-leading encryption",
      gradient: "from-destructive to-red-600",
    },
    {
      icon: Zap,
      title: "Instant Swaps",
      description: "Exchange tokens instantly with the best rates across chains",
      gradient: "from-warning to-yellow-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of users in the DeFi revolution",
      gradient: "from-info to-cyan-600",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Total Volume", value: "$2.5B+" },
    { label: "Supported Chains", value: "3" },
    { label: "Game Rewards Paid", value: "$10M+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HOOD DeFi
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")} className="bg-gradient-primary hover:opacity-90 shadow-glow-primary">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_0%,_transparent_50%)] opacity-20" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-primary shadow-glow-primary">
              <Wallet className="w-8 h-8 text-primary-foreground" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                HOOD DeFi
              </h1>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Your Gateway to Multi-Chain Finance
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage wallets, trade tokens, track portfolios, and earn rewards through blockchain games—all in one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg px-8 py-6"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-border/50 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6"
              >
                Explore Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Everything You Need
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your crypto assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glass overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <CardContent className="relative z-10 py-16 px-8 text-center space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Ready to Start Your DeFi Journey?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who trust HOOD DeFi for their crypto needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg px-8 py-6"
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/about")}
                  className="border-border/50 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;
