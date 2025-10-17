import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, Gamepad2, CheckCircle, Lock, Smartphone, ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HOOD DeFi
            </h1>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About HOOD DeFi
            </h2>
            <p className="text-xl text-muted-foreground">
              Revolutionizing decentralized finance for everyone
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">Our Mission</h3>
              <p className="text-lg text-muted-foreground">
                HOOD DeFi is revolutionizing the way users interact with decentralized finance. We've built a comprehensive platform that removes the complexity from crypto while maintaining the security and power of blockchain technology.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to democratize access to DeFi by providing an intuitive, feature-rich platform that serves both beginners and advanced users. From multi-chain wallet management to AI-powered portfolio insights and blockchain gaming, we're creating the future of finance.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
                <CardContent className="p-6 space-y-3">
                  <CheckCircle className="w-10 h-10 text-success" />
                  <h4 className="font-semibold text-xl">Trusted</h4>
                  <p className="text-sm text-muted-foreground">Bank-level security standards protect your assets</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
                <CardContent className="p-6 space-y-3">
                  <Smartphone className="w-10 h-10 text-accent" />
                  <h4 className="font-semibold text-xl">Accessible</h4>
                  <p className="text-sm text-muted-foreground">Easy-to-use interface for all skill levels</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
                <CardContent className="p-6 space-y-3">
                  <Lock className="w-10 h-10 text-primary" />
                  <h4 className="font-semibold text-xl">Secure</h4>
                  <p className="text-sm text-muted-foreground">Your keys, your crypto, always</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
                <CardContent className="p-6 space-y-3">
                  <TrendingUp className="w-10 h-10 text-accent" />
                  <h4 className="font-semibold text-xl">Innovative</h4>
                  <p className="text-sm text-muted-foreground">AI-powered insights and analytics</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">What Makes Us Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold">Multi-Chain Support</h4>
                <p className="text-muted-foreground">
                  Seamlessly manage assets across Ethereum, BSC, and TRON networks from a single, unified interface.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold">AI-Powered Insights</h4>
                <p className="text-muted-foreground">
                  Get intelligent recommendations and market analysis to optimize your portfolio and make informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-green-600 flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold">Earn While Playing</h4>
                <p className="text-muted-foreground">
                  Turn gaming into earning with blockchain-powered games that reward you with real crypto tokens.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl md:text-4xl font-bold">How It Works</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with HOOD DeFi in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold shadow-glow-primary">
                1
              </div>
              <h4 className="text-xl font-bold">Create Account</h4>
              <p className="text-muted-foreground">Sign up with your email and secure your account with our advanced encryption</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-2xl font-bold shadow-glow-accent">
                2
              </div>
              <h4 className="text-xl font-bold">Set Up Wallet</h4>
              <p className="text-muted-foreground">Create or import your multi-chain wallet to manage ETH, BSC, and TRON assets</p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-bold">Start Trading & Earning</h4>
              <p className="text-muted-foreground">Swap tokens, track your portfolio, and earn rewards through our gaming platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who trust HOOD DeFi for their crypto needs
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg px-8 py-6"
          >
            Create Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
