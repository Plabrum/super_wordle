import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, LetterState, rand_word } from "./utils/word_utils";
const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  newGame: () => void;
  addGuess: (guess: string) => void;
  gameState: "playing" | "won" | "lost";
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      answer: rand_word(),
      rows: [],
      gameState: "playing",
      addGuess: (guess: string) => {
        const result = computeGuess(guess, get().answer);
        const didWin = result.every((i) => i === LetterState.Match);
        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];

        set(() => ({
          rows,
          gameState: didWin
            ? "won"
            : rows.length === GUESS_LENGTH
            ? "lost"
            : "playing",
        }));
      },
      newGame: () => {
        set({
          answer: rand_word(),
          rows: [],
          gameState: "playing",
        });
      },
    }),
    {
      name: "super_wordle",
    }
  )
);

// useStore.persist.clearStorage();
