import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlayerName, setPlayerName } from '@/lib/player';

interface HomeScreenProps {
  onCreateGame: (name: string) => void;
  onJoinGame: (name: string, code: string) => void;
  initialCode?: string;
}

export function HomeScreen({ onCreateGame, onJoinGame, initialCode }: HomeScreenProps) {
  const [name, setName] = useState(getPlayerName());
  const [joinCode, setJoinCode] = useState(initialCode || '');
  const [mode, setMode] = useState<'menu' | 'join'>(initialCode ? 'join' : 'menu');

  const handleCreate = () => {
    if (!name.trim()) return;
    setPlayerName(name.trim());
    onCreateGame(name.trim());
  };

  const handleJoin = () => {
    if (!name.trim() || !joinCode.trim()) return;
    setPlayerName(name.trim());
    onJoinGame(name.trim(), joinCode.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border">
        <CardHeader className="text-center space-y-4">
          <div className="font-mono text-5xl font-bold tracking-tighter">
            <span className="text-primary neon-text">OX</span>
            <span className="text-foreground"> Bull</span>
            <span className="text-secondary amber-text"> Cow</span>
          </div>
          <p className="text-muted-foreground text-sm">
            A real-time multiplayer guessing game
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block font-mono">YOUR NAME</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="font-mono bg-muted border-border"
              maxLength={20}
            />
          </div>

          {mode === 'menu' ? (
            <div className="space-y-3">
              <Button
                variant="neon"
                size="lg"
                className="w-full"
                onClick={handleCreate}
                disabled={!name.trim()}
              >
                Create Game
              </Button>
              <Button
                variant="amber"
                size="lg"
                className="w-full"
                onClick={() => setMode('join')}
                disabled={!name.trim()}
              >
                Join Game
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block font-mono">ROOM CODE</label>
                <Input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-character code..."
                  className="font-mono text-center text-2xl tracking-[0.5em] bg-muted border-border uppercase"
                  maxLength={6}
                />
              </div>
              <Button
                variant="neon"
                size="lg"
                className="w-full"
                onClick={handleJoin}
                disabled={!name.trim() || joinCode.length !== 6}
              >
                Join Room
              </Button>
              <Button
                variant="ghost"
                onClick={() => setMode('menu')}
                className="w-full text-muted-foreground"
              >
                ← Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
