import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Leaderboard = () => {
  const players = [
    { rank: 1, name: "CryptoKing", earnings: "1.2345", games: 150, achievements: 25 },
    { rank: 2, name: "TokenMaster", earnings: "0.9876", games: 120, achievements: 20 },
    { rank: 3, name: "DeFiPro", earnings: "0.8765", games: 100, achievements: 18 },
    { rank: 4, name: "BlockchainBoss", earnings: "0.7654", games: 95, achievements: 15 },
    { rank: 5, name: "CoinCollector", earnings: "0.6543", games: 85, achievements: 12 },
    { rank: 6, name: "GameMaster", earnings: "0.5432", games: 75, achievements: 10 },
    { rank: 7, name: "EthereumElite", earnings: "0.4321", games: 65, achievements: 8 },
    { rank: 8, name: "NFTNinja", earnings: "0.3210", games: 55, achievements: 6 },
  ];

  const achievements = [
    { name: "First Click", desc: "Make your first click", rarity: "Common" },
    { name: "100 Clicks", desc: "Click 100 times", rarity: "Rare" },
    { name: "Token Millionaire", desc: "Earn 1M tokens", rarity: "Epic" },
    { name: "Daily Grinder", desc: "Play 30 days in a row", rarity: "Legendary" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground">#{rank}</span>;
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">Top players and achievements</p>
        </div>

        <Tabs defaultValue="all-time" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value="all-time" className="space-y-4 mt-6">
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Top Players
                </CardTitle>
                <CardDescription>Rankings based on total earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        player.rank <= 3
                          ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
                          : "bg-secondary/30 hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(player.rank)}
                        </div>
                        <div>
                          <p className="font-semibold">{player.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {player.games} games • {player.achievements} achievements
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{player.earnings}</p>
                        <p className="text-xs text-muted-foreground">Tokens</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4 mt-6">
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Monthly leaderboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-6">
            <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glass">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Weekly leaderboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements */}
        <Card className="border-border/50 backdrop-blur-xl bg-gradient-to-br from-card to-primary/5 shadow-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Achievements
            </CardTitle>
            <CardDescription>Unlock special badges by completing challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{achievement.name}</p>
                      <Badge
                        variant={
                          achievement.rarity === "Legendary"
                            ? "default"
                            : achievement.rarity === "Epic"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;
