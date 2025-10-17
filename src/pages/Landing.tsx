import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, Coins, Shield, Zap, Users, ArrowRight, Gamepad2, Mail, MapPin, Phone, CheckCircle, Lock, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

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

      {/* About Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About HOOD DeFi
              </h3>
              <p className="text-lg text-muted-foreground">
                HOOD DeFi is revolutionizing the way users interact with decentralized finance. We've built a comprehensive platform that removes the complexity from crypto while maintaining the security and power of blockchain technology.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to democratize access to DeFi by providing an intuitive, feature-rich platform that serves both beginners and advanced users. From multi-chain wallet management to AI-powered portfolio insights and blockchain gaming, we're creating the future of finance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="space-y-2">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <h4 className="font-semibold">Trusted</h4>
                  <p className="text-sm text-muted-foreground">Bank-level security standards</p>
                </div>
                <div className="space-y-2">
                  <Smartphone className="w-8 h-8 text-accent" />
                  <h4 className="font-semibold">Accessible</h4>
                  <p className="text-sm text-muted-foreground">Easy-to-use interface</p>
                </div>
                <div className="space-y-2">
                  <Lock className="w-8 h-8 text-primary" />
                  <h4 className="font-semibold">Secure</h4>
                  <p className="text-sm text-muted-foreground">Your keys, your crypto</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glow-primary">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Multi-Chain Support</h5>
                        <p className="text-sm text-muted-foreground">Seamlessly manage assets across Ethereum, BSC, and TRON networks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">AI-Powered Insights</h5>
                        <p className="text-sm text-muted-foreground">Get intelligent recommendations to optimize your portfolio</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-green-600 flex items-center justify-center shadow-lg">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">Earn While Playing</h5>
                        <p className="text-sm text-muted-foreground">Turn gaming into earning with blockchain-powered rewards</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How It Works
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with HOOD DeFi in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold shadow-glow-primary">
                  1
                </div>
                <h4 className="text-xl font-bold">Create Account</h4>
                <p className="text-muted-foreground">Sign up with your email and secure your account with our advanced encryption</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-2xl font-bold shadow-glow-accent">
                  2
                </div>
                <h4 className="text-xl font-bold">Set Up Wallet</h4>
                <p className="text-muted-foreground">Create or import your multi-chain wallet to manage ETH, BSC, and TRON assets</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h4 className="text-xl font-bold">Start Trading & Earning</h4>
                <p className="text-muted-foreground">Swap tokens, track your portfolio, and earn rewards through our gaming platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Email</h5>
                      <p className="text-sm text-muted-foreground">support@hooddefi.com</p>
                      <p className="text-sm text-muted-foreground">partnerships@hooddefi.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Office</h5>
                      <p className="text-sm text-muted-foreground">123 Blockchain Avenue</p>
                      <p className="text-sm text-muted-foreground">Crypto City, CC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">Phone</h5>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-primary">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;
