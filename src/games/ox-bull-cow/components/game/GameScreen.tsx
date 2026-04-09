import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isValidNumberGuess, isValidWordGuess } from '@/lib/game-logic';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];
type Guess = Database['public']['Tables']['guesses']['Row'];

interface GameScreenProps {
  room: Room;
  guesses: Guess[];
  isPlayer1: boolean;
  isPlayer2: boolean;
  onGuess: (guess: string) => Promise<unknown>;
  onHome: () => void;
}

export function GameScreen({ room, guesses, isPlayer1, isPlayer2, onGuess, onHome }: GameScreenProps) {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [guesses]);

  const canGuess = isPlayer2; // Player 2 guesses Player 1's secret

  const handleSubmit = async () => {
    const normalized = room.game_mode === 'word' ? guess.toLowerCase() : guess;
    const isValid = room.game_mode === 'number'
      ? isValidNumberGuess(normalized, room.secret_length)
      : isValidWordGuess(normalized, room.secret_length);

    if (!isValid) {
      setError(`Enter a valid ${room.secret_length}-char ${room.game_mode}, no repeats`);
      return;
    }

    setSubmitting(true);
    setError('');
    await onGuess(normalized);
    setGuess('');
    setSubmitting(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitting) handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-card border-border">
        <CardHeader className="text-center pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              {room.game_mode === 'number' ? '🔢' : '🔤'} {room.secret_length} chars
            </span>
            <span className="text-xs font-mono text-primary">
              ROOM: {room.room_code}
            </span>
          </div>
          <CardTitle className="font-mono text-xl text-foreground">
            {canGuess ? 'Your turn to guess!' : 'Waiting for opponent\'s guess...'}
          </CardTitle>
          <div className="flex gap-4 justify-center text-sm font-mono">
            <span className={isPlayer1 ? 'text-primary' : 'text-muted-foreground'}>
              {room.player1_name} {isPlayer1 ? '(you)' : ''}
            </span>
            <span className="text-muted-foreground">vs</span>
            <span className={isPlayer2 ? 'text-secondary' : 'text-muted-foreground'}>
              {room.player2_name} {isPlayer2 ? '(you)' : ''}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Guess history */}
          <div ref={listRef} className="max-h-64 overflow-y-auto space-y-1">
            {guesses.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8 font-mono">
                No guesses yet
              </p>
            ) : (
              <>
                <div className="grid grid-cols-[2rem_1fr_3rem_3rem] gap-2 px-2 py-1 text-xs font-mono text-muted-foreground sticky top-0 bg-card">
                  <span>#</span>
                  <span>GUESS</span>
                  <span className="text-center">🐂</span>
                  <span className="text-center">🐄</span>
                </div>
                {guesses.map((g) => (
                  <div
                    key={g.id}
                    className="grid grid-cols-[2rem_1fr_3rem_3rem] gap-2 px-2 py-2 rounded-md bg-muted font-mono text-sm animate-slide-up"
                  >
                    <span className="text-muted-foreground">{g.guess_number}</span>
                    <span className="text-foreground tracking-[0.3em] uppercase">{g.guess}</span>
                    <span className="text-center font-bold text-primary">{g.bulls}</span>
                    <span className="text-center font-bold text-secondary">{g.cows}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Input */}
          {canGuess && room.status === 'playing' && (
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={guess}
                onChange={(e) => {
                  setGuess(e.target.value.toUpperCase());
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder={room.game_mode === 'number' ? '1234' : 'WORD'}
                className="font-mono text-center text-xl tracking-[0.4em] bg-muted border-border uppercase"
                maxLength={room.secret_length}
                disabled={submitting}
                autoFocus
              />
              <Button
                variant="neon"
                onClick={handleSubmit}
                disabled={submitting || guess.length !== room.secret_length}
              >
                →
              </Button>
            </div>
          )}
          {error && <p className="text-destructive text-xs font-mono text-center">{error}</p>}

          {/* Legend */}
          <div className="flex gap-4 justify-center text-xs text-muted-foreground font-mono">
            <span>🐂 <span className="text-primary">Bull</span> = right place</span>
            <span>🐄 <span className="text-secondary">Cow</span> = wrong place</span>
          </div>
          <Button variant="ghost" onClick={onHome} className="w-full text-muted-foreground font-mono">
            🏠 Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
