import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isValidNumberGuess, isValidWordGuess } from '@/lib/game-logic';
import { useComputerGame } from '@/hooks/useComputerGame';

interface ComputerGameScreenProps {
  mode: 'number' | 'word';
  length: number;
  playerName: string;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ComputerGameScreen({ mode, length, playerName, onPlayAgain, onHome }: ComputerGameScreenProps) {
  const { secret, guesses, finished, won, submitGuess } = useComputerGame(mode, length);
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

  const handleSubmit = async () => {
    const normalized = mode === 'word' ? guess.toLowerCase() : guess;
    const isValid = mode === 'number'
      ? isValidNumberGuess(normalized, length)
      : isValidWordGuess(normalized, length);

    if (!isValid) {
      setError(`Enter a valid ${length}-char ${mode}, no repeats`);
      return;
    }

    setSubmitting(true);
    setError('');
    await submitGuess(normalized);
    setGuess('');
    setSubmitting(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitting) handleSubmit();
  };

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card border-border text-center">
          <CardHeader>
            <div className="text-5xl mb-4">🎉</div>
            <CardTitle className="font-mono text-2xl text-primary">You Win!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-mono text-muted-foreground">
              You cracked <span className="text-primary tracking-[0.3em] uppercase">{secret}</span> in{' '}
              <span className="text-primary font-bold">{guesses.length}</span> guesses!
            </p>
            <Button variant="neon" size="lg" className="w-full" onClick={onPlayAgain}>
              Play Again 🔄
            </Button>
            <Button variant="ghost" onClick={onHome} className="w-full text-muted-foreground font-mono">
              🏠 Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-card border-border">
        <CardHeader className="text-center pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              {mode === 'number' ? '🔢' : '🔤'} {length} chars
            </span>
            <span className="text-xs font-mono text-primary">
              🤖 VS COMPUTER
            </span>
          </div>
          <CardTitle className="font-mono text-xl text-foreground">
            Crack the code!
          </CardTitle>
          <div className="flex gap-4 justify-center text-sm font-mono">
            <span className="text-secondary">{playerName} (you)</span>
            <span className="text-muted-foreground">vs</span>
            <span className="text-muted-foreground">🤖 Computer</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value.toUpperCase());
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'number' ? '1234' : 'WORD'}
              className="font-mono text-center text-xl tracking-[0.4em] bg-muted border-border uppercase"
              maxLength={length}
              disabled={submitting}
              autoFocus
            />
            <Button
              variant="neon"
              onClick={handleSubmit}
              disabled={submitting || guess.length !== length}
            >
              →
            </Button>
          </div>
          {error && <p className="text-destructive text-xs font-mono text-center">{error}</p>}

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
