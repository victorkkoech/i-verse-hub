import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins, Trophy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClickToEarn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clicks, setClicks] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [playsLeft, setPlaysLeft] = useState(10);
  const maxClicks = 100;
  const rewardPerClick = 0.00001;

  const handleClick = () => {
    if (clicks < maxClicks && playsLeft > 0) {
      const newClicks = clicks + 1;
      setClicks(newClicks);
      setEarnings(Number((earnings + rewardPerClick).toFixed(5)));

      if (newClicks >= maxClicks) {
        setPlaysLeft(playsLeft - 1);
        toast({
          title: "Round Complete!",
          description: `You earned ${(maxClicks * rewardPerClick).toFixed(5)} tokens!`,
        });
        setTimeout(() => {
          setClicks(0);
        }, 1000);
      }
    } else if (playsLeft === 0) {
      toast({
        title: "No plays left",
        description: "Come back tomorrow for more plays!",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/games")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Click to Earn
            </h1>
            <p className="text-muted-foreground mt-2">Click the button to earn crypto rewards!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-border/50 backdrop-blur-xl bg-gradient-primary/10 shadow-glass">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Coins className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold text-success">{earnings.toFixed(5)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 backdrop-blur-xl bg-gradient-accent/10 shadow-glass">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">Plays Left</p>
                  <p className="text-2xl font-bold text-accent">{playsLeft}/10</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Card */}
          <Card className="border-border/50 backdrop-blur-xl bg-card/80 shadow-glow-primary">
            <CardHeader>
              <CardTitle>Current Round</CardTitle>
              <CardDescription>Click {maxClicks} times to complete the round</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{clicks}/{maxClicks} clicks</span>
                </div>
                <Progress value={(clicks / maxClicks) * 100} className="h-3" />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleClick}
                  disabled={playsLeft === 0}
                  className="w-48 h-48 rounded-full bg-gradient-primary hover:scale-110 active:scale-95 shadow-glow-primary transition-transform text-2xl font-bold"
                >
                  CLICK!
                </Button>
              </div>

              <div className="text-center p-4 rounded-lg bg-secondary/20 border border-border/50">
                <p className="text-sm text-muted-foreground">Reward this round</p>
                <p className="text-xl font-bold text-success">
                  {(clicks * rewardPerClick).toFixed(5)} Tokens
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="border-border/50 backdrop-blur-xl bg-gradient-card shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Today's Top Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Player 1", earnings: "0.1234" },
                  { rank: 2, name: "Player 2", earnings: "0.0987" },
                  { rank: 3, name: "Player 3", earnings: "0.0756" },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center font-bold">
                        #{player.rank}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <span className="text-success font-semibold">{player.earnings}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate("/leaderboard")}
              >
                View Full Leaderboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ClickToEarn;
