import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { GUESS_QUANTITY, WORD_LENGTH } from "./pages/index";
import {
  computeGuess,
  LetterState,
  rand_word,
  words_left,
} from "./utils/word_utils";
const GUESS_LENGTH = 6;
const GUESS_QUANTITY = 6;
const WORD_LENGTH = 5;

interface GuessRow {
  guess: string;
  gradedGuess?: LetterState[];
}

export interface StoreState {
  answer: string;
  rows: GuessRow[];
  previousGuesses: string[];
  guessCount: number;
  wordsRemaining: number[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  insertGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => {
      function insertGuess(guess: string) {
        // Guesses are pre-verified
        const gradedGuess = computeGuess(guess, get().answer);
        const guessCount = get().guessCount;
        const rows = get().rows;
        let newGuesses = get().previousGuesses;
        newGuesses.push(guess);
        rows[guessCount] = { guess, gradedGuess };

        // Update state of game
        const gameState = gradedGuess.every((i) => i === LetterState.Match)
          ? "won"
          : guessCount === GUESS_LENGTH - 1
          ? "lost"
          : "playing";

        const keyboardLetterState = get().keyboardLetterState;
        gradedGuess.forEach((r, index) => {
          // seems like it can just be r
          const guessedLetter = guess[index];
          const currentLetterState = keyboardLetterState[guessedLetter];
          // Make sure higher ranked letters are not replaced
          switch (currentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (r === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[guessedLetter] = r;
              break;
          }
        });

        // Calculate how good a guess the word wass
        let wordsReamining = get().wordsRemaining;
        wordsReamining[guessCount] = words_left(keyboardLetterState);

        set(() => ({
          rows,
          previousGuesses: newGuesses,
          keyboardLetterState,
          guessCount: guessCount + 1,
          wordsRemaining: wordsReamining,
          gameState: gameState,
        }));
      }

      return {
        answer: rand_word(),
        rows: new_rows(),
        previousGuesses: [],
        wordsRemaining: Array(GUESS_LENGTH).fill(null),
        guessCount: 0,
        keyboardLetterState: {},
        gameState: "playing",
        insertGuess,
        newGame: () => {
          set({
            answer: rand_word(),
            rows: new_rows(),
            previousGuesses: [],
            wordsRemaining: Array(GUESS_LENGTH).fill(null),
            gameState: "playing",
            keyboardLetterState: {},
            guessCount: 0,
          });
        },
      };
    },
    {
      name: "super_wordle",
    }
  )
);

function new_rows(): GuessRow[] {
  const guess = "";
  const gradedGuess = null;
  const emptyRows = Array(GUESS_LENGTH).fill("");
  return emptyRows;
}

export function reset_store(): void {
  useStore.persist.clearStorage();
  console.log("reset the storage");
}
