import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModeSelectProps {
  onSelect: (mode: 'number' | 'word', length: number, opponent: 'player' | 'computer') => void;
  onBack: () => void;
}

export function ModeSelect({ onSelect, onBack }: ModeSelectProps) {
  const [mode, setMode] = useState<'number' | 'word'>('number');
  const [length, setLength] = useState(4);
  const [opponent, setOpponent] = useState<'player' | 'computer'>('player');

  const lengths = mode === 'number' ? [3, 4, 5, 6] : [4, 5, 6];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-mono text-2xl text-foreground">Choose Game Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setMode('number'); setLength(4); }}
              className={`p-6 rounded-lg border-2 transition-all font-mono text-center ${
                mode === 'number'
                  ? 'border-primary bg-primary/10 neon-border'
                  : 'border-border bg-muted hover:border-muted-foreground'
              }`}
            >
              <div className="text-3xl mb-2">🔢</div>
              <div className="font-bold text-foreground">Numbers</div>
              <div className="text-xs text-muted-foreground mt-1">e.g. 1234</div>
            </button>
            <button
              onClick={() => { setMode('word'); setLength(4); }}
              className={`p-6 rounded-lg border-2 transition-all font-mono text-center ${
                mode === 'word'
                  ? 'border-secondary bg-secondary/10'
                  : 'border-border bg-muted hover:border-muted-foreground'
              }`}
            >
              <div className="text-3xl mb-2">🔤</div>
              <div className="font-bold text-foreground">Words</div>
              <div className="text-xs text-muted-foreground mt-1">e.g. STAR</div>
            </button>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-3 block font-mono">DIFFICULTY (LENGTH)</label>
            <div className="flex gap-2">
              {lengths.map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`flex-1 py-3 rounded-lg font-mono font-bold transition-all ${
                    length === l
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Opponent selection */}
          <div>
            <label className="text-sm text-muted-foreground mb-3 block font-mono">OPPONENT</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOpponent('computer')}
                className={`p-4 rounded-lg border-2 transition-all font-mono text-center ${
                  opponent === 'computer'
                    ? 'border-primary bg-primary/10 neon-border'
                    : 'border-border bg-muted hover:border-muted-foreground'
                }`}
              >
                <div className="text-2xl mb-1">🤖</div>
                <div className="font-bold text-foreground text-sm">Computer</div>
              </button>
              <button
                onClick={() => setOpponent('player')}
                className={`p-4 rounded-lg border-2 transition-all font-mono text-center ${
                  opponent === 'player'
                    ? 'border-primary bg-primary/10 neon-border'
                    : 'border-border bg-muted hover:border-muted-foreground'
                }`}
              >
                <div className="text-2xl mb-1">👤</div>
                <div className="font-bold text-foreground text-sm">Friend</div>
              </button>
            </div>
          </div>

          <Button
            variant="neon"
            size="lg"
            className="w-full"
            onClick={() => onSelect(mode, length, opponent)}
          >
            {opponent === 'computer' ? 'Play vs Computer →' : 'Create Room →'}
          </Button>
          <Button variant="ghost" onClick={onBack} className="w-full text-muted-foreground font-mono">
            ← Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
