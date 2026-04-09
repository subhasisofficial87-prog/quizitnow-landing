import { useState, useCallback } from 'react';
import { computeBullsAndCows, generateComputerSecret } from '@/lib/game-logic';

interface ComputerGuess {
  id: string;
  guess: string;
  bulls: number;
  cows: number;
  guess_number: number;
}

export function useComputerGame(mode: 'number' | 'word', length: number) {
  const [secret] = useState(() => generateComputerSecret(mode, length));
  const [guesses, setGuesses] = useState<ComputerGuess[]>([]);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  const submitGuess = useCallback(async (guess: string) => {
    const { bulls, cows } = computeBullsAndCows(secret, guess.toLowerCase());
    const newGuess: ComputerGuess = {
      id: crypto.randomUUID(),
      guess,
      bulls,
      cows,
      guess_number: guesses.length + 1,
    };
    const updated = [...guesses, newGuess];
    setGuesses(updated);

    if (bulls === length) {
      setFinished(true);
      setWon(true);
    }
    return { bulls, cows };
  }, [secret, guesses, length]);

  return { secret, guesses, finished, won, submitGuess };
}
