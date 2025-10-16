import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Coins, Trophy, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      name: "Click to Earn",
      description: "Click the button to earn crypto rewards! Simple and fun.",
      reward: "0.001",
      plays: "10/10",
      status: "active",
      gradient: "from-primary to-purple-600",
    },
    {
      id: 2,
      name: "Token Puzzle",
      description: "Solve puzzles to earn bonus rewards",
      reward: "0.005",
      plays: "0/5",
      status: "coming-soon",
      gradient: "from-accent to-blue-600",
    },
    {
      id: 3,
      name: "Crypto Battle",
      description: "Battle other players for rewards",
      reward: "0.01",
      plays: "0/3",
      status: "coming-soon",
      gradient: "from-success to-green-600",
    },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blockchain Games
          </h1>
          <p className="text-muted-foreground mt-2">Play games and earn crypto rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Coins, label: "Total Earned", value: "0.000", unit: "Tokens" },
            { icon: Gamepad2, label: "Games Played", value: "0", unit: "Sessions" },
            { icon: Trophy, label: "Achievements", value: "0", unit: "Unlocked" },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary shadow-glow-primary">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">
                      {stat.value} <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${game.gradient} flex items-center justify-center mb-4`}>
                    <Gamepad2 className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reward per play</p>
                    <p className="font-semibold text-success">{game.reward} Tokens</p>
                  </div>
                  <Badge variant={game.status === "active" ? "default" : "secondary"}>
                    {game.plays} plays
                  </Badge>
                </div>
                {game.status === "active" ? (
                  <Button
                    onClick={() => navigate(`/games/click-to-earn`)}
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-primary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Missions */}
        <Card className="border-border/50 backdrop-blur-xl bg-gradient-to-br from-card to-accent/5 shadow-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Daily Missions
            </CardTitle>
            <CardDescription>Complete missions to earn bonus rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Play 3 games", progress: "0/3", reward: "0.01" },
                { task: "Earn 0.1 tokens", progress: "0/0.1", reward: "0.05" },
                { task: "Share achievement", progress: "0/1", reward: "0.02" },
              ].map((mission, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div>
                    <p className="font-medium">{mission.task}</p>
                    <p className="text-sm text-muted-foreground">{mission.progress}</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">+{mission.reward}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Games;
