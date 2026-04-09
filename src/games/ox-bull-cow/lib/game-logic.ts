export function computeBullsAndCows(secret: string, guess: string): { bulls: number; cows: number } {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < secret.length; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

export function hasRepeatingChars(value: string): boolean {
  return new Set(value.split('')).size !== value.length;
}

export function isValidNumberGuess(value: string, length: number): boolean {
  return /^\d+$/.test(value) && value.length === length && !hasRepeatingChars(value);
}

export function isValidWordGuess(value: string, length: number): boolean {
  return /^[a-zA-Z]+$/.test(value) && value.length === length && !hasRepeatingChars(value.toLowerCase());
}

export function generateComputerSecret(mode: 'number' | 'word', length: number): string {
  if (mode === 'number') {
    const digits = '0123456789'.split('');
    const shuffled = digits.sort(() => Math.random() - 0.5);
    // Ensure first digit isn't 0
    if (shuffled[0] === '0') {
      const nonZeroIdx = shuffled.findIndex(d => d !== '0');
      [shuffled[0], shuffled[nonZeroIdx]] = [shuffled[nonZeroIdx], shuffled[0]];
    }
    return shuffled.slice(0, length).join('');
  }
  // Word mode: pick random unique letters
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const shuffled = letters.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, length).join('');
}
