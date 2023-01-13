import { create } from "zustand";
import { persist } from "zustand/middleware";
import { rand_word } from "./utils/word_utils";

interface StoreState {
  answer: string;
  guesses: string[];
  newGame: () => void;
  addGuess: (guess: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      answer: rand_word(),
      guesses: ["hello", "solar", "penny"],

      addGuess: (guess: string) => {
        set((state) => ({
          guesses: [...state.guesses, guess],
        }));
      },
      newGame: () => {
        set({
          answer: rand_word(),
          guesses: [],
        });
      },
    }),
    {
      name: "super_wordle",
    }
  )
);

// useStore.persist.clearStorage();
