import { GameResult } from '../types/game';

const CHALLENGE_KEY = 'qw_pending_challenge';

export const encodeGameChallenge = (games: GameResult[]): string => {
  const challenge = games.map(game => ({
    id: game.trackId,
    s: game.score,
    t: game.time
  }));
  
  return btoa(JSON.stringify(challenge));
};

export const decodeGameChallenge = (code: string): { 
  trackId: string;
  score: number;
  time: number;
}[] => {
  try {
    const decoded = JSON.parse(atob(code));
    return decoded.map((game: any) => ({
      trackId: game.id,
      score: game.s,
      time: game.t
    }));
  } catch {
    throw new Error('Invalid challenge code');
  }
};

export const storePendingChallenge = (code: string): void => {
  if (code) {
    localStorage.setItem(CHALLENGE_KEY, code);
  }
};

export const getPendingChallenge = (): string | null => {
  return localStorage.getItem(CHALLENGE_KEY);
};

export const clearPendingChallenge = (): void => {
  localStorage.removeItem(CHALLENGE_KEY);
};