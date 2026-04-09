import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];
type Guess = Database['public']['Tables']['guesses']['Row'];

interface ResultScreenProps {
  room: Room;
  guesses: Guess[];
  isPlayer1: boolean;
  isPlayer2: boolean;
  onPlayAgain: () => void;
}

export function ResultScreen({ room, guesses, isPlayer1, isPlayer2, onPlayAgain }: ResultScreenProps) {
  const isWinner = room.winner === (isPlayer1 ? room.player1_id : room.player2_id);
  const winnerName = room.winner === room.player1_id ? room.player1_name : room.player2_name;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border text-center">
        <CardHeader>
          <div className="text-6xl mb-4">{isWinner ? '🎉' : '😅'}</div>
          <CardTitle className="font-mono text-3xl">
            {isWinner ? (
              <span className="text-primary neon-text">You Won!</span>
            ) : (
              <span className="text-secondary amber-text">{winnerName} Wins!</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-mono font-bold text-foreground">{guesses.length}</div>
              <div className="text-xs text-muted-foreground font-mono">GUESSES</div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="text-2xl font-mono font-bold text-primary uppercase tracking-[0.2em]">
                {room.secret}
              </div>
              <div className="text-xs text-muted-foreground font-mono">SECRET</div>
            </div>
          </div>

          <Button variant="neon" size="lg" className="w-full" onClick={onPlayAgain}>
            Play Again 🔄
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
