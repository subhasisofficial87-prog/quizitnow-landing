import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isValidNumberGuess, isValidWordGuess } from '@/lib/game-logic';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];

interface SetSecretProps {
  room: Room;
  onSetSecret: (secret: string) => void;
  isPlayer1: boolean;
  onHome: () => void;
}

export function SetSecret({ room, onSetSecret, isPlayer1, onHome }: SetSecretProps) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const validate = (val: string) => {
    if (room.game_mode === 'number') {
      return isValidNumberGuess(val, room.secret_length);
    }
    return isValidWordGuess(val, room.secret_length);
  };

  const handleSubmit = () => {
    const normalized = room.game_mode === 'word' ? secret.toLowerCase() : secret;
    if (!validate(normalized)) {
      setError(`Enter a valid ${room.secret_length}-character ${room.game_mode} with no repeating characters`);
      return;
    }
    setError('');
    onSetSecret(normalized);
  };

  if (!isPlayer1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card border-border text-center">
          <CardContent className="py-12 space-y-4">
            <div className="text-4xl">🤫</div>
            <p className="text-foreground font-mono">Opponent is setting their secret...</p>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <Button variant="ghost" onClick={onHome} className="w-full text-muted-foreground font-mono">
              🏠 Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-mono text-2xl text-foreground">Set Your Secret</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose a {room.secret_length}-character {room.game_mode} with no repeating characters
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={secret}
            onChange={(e) => {
              setSecret(e.target.value);
              setError('');
            }}
            placeholder={room.game_mode === 'number' ? '1234' : 'STAR'}
            className="font-mono text-center text-3xl tracking-[0.5em] bg-muted border-border uppercase"
            maxLength={room.secret_length}
            type={room.game_mode === 'number' ? 'tel' : 'text'}
          />
          {error && <p className="text-destructive text-sm font-mono text-center">{error}</p>}
          <Button
            variant="neon"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={secret.length !== room.secret_length}
          >
            Confirm Secret 🔒
          </Button>
          <Button variant="ghost" onClick={onHome} className="w-full text-muted-foreground font-mono">
            🏠 Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
