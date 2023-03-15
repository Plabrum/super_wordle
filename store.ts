import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
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
type gameStateType = "preGame" | "playing" | "won" | "lost";
export interface StoreState {
  answer: string;
  rows: GuessRow[];
  previousGuesses: string[];
  guessCount: number;

  wordsRemaining: number[];
  startTime: number | null;
  endTime: number | null;
  gameState: gameStateType;
  keyboardLetterState: { [letter: string]: LetterState };

  insertGuess: (guess: string) => void;
  startGame: () => void;
  newGame: () => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        answer: rand_word(),
        rows: new_rows(),
        previousGuesses: [],
        guessCount: 0,

        wordsRemaining: Array(GUESS_LENGTH).fill(null),
        gameState: "preGame",
        keyboardLetterState: {},
        startTime: null,
        endTime: null,

        insertGuess: (guess: string) => {
          return set(
            insertGuess(
              guess,
              get().guessCount,
              get().rows,
              get().previousGuesses,
              get().answer,
              get().keyboardLetterState,
              get().wordsRemaining,
              get().startTime,
              get().endTime
            )
          );
        },
        startGame: () => set({ gameState: "playing", startTime: Date.now() }),
        newGame: () => {
          set({
            answer: rand_word(),
            rows: new_rows(),
            previousGuesses: [],
            startTime: null,
            endTime: null,
            wordsRemaining: Array(GUESS_LENGTH).fill(null),
            gameState: "preGame",
            keyboardLetterState: {},
            guessCount: 0,
          });
        },
      }),
      {
        name: "super_wordle",
      }
    )
  )
);

function insertGuess(
  guess: string,
  guessCount: number,
  rows: GuessRow[],
  previousGuesses: string[],
  answer: string,
  keyboardLetterState: { [letter: string]: LetterState },
  wordsRemaining: number[],
  startTime: number | null,
  endTime: number | null
) {
  // Guesses are pre-verified
  const gradedGuess = computeGuess(guess, answer);
  // const guessCount = get().guessCount;
  // const rows = get().rows;
  var newGuesses = previousGuesses;
  newGuesses.push(guess);
  rows[guessCount] = { guess, gradedGuess };

  // Update state of game
  var gameState: gameStateType = "playing";

  // const gameState: gameStateType = gradedGuess.every(
  //   (i) => i === LetterState.Match
  // )
  //   ? "won"
  //   : guessCount === GUESS_LENGTH - 1
  //   ? "lost"
  //   : "playing";
  var endGame = null;

  if (gradedGuess.every((i) => i === LetterState.Match)) {
    gameState = "won";
    endGame = Date.now() - (startTime || 0);
  } else if (guessCount === GUESS_LENGTH - 1) {
    gameState = "lost";
  }
  // const keyboardLetterState = get().keyboardLetterState;
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
  // let wordsReamining = get().wordsRemaining;
  wordsRemaining[guessCount] = words_left(keyboardLetterState);
  return {
    rows: rows,
    previousGuesses: newGuesses,
    keyboardLetterState,
    guessCount: guessCount + 1,
    wordsRemaining: wordsRemaining,
    gameState: gameState,
    endTime: endGame,
  };
}

/*
(guess) => {
          const {
            rows,
            previousGuesses,
            keyboardLetterState,
            guessCount,
            wordsRemaining,
            gameState,
          } = insertGuess(
            guess,
            get().guessCount,
            get().rows,
            get().previousGuesses,
            get().answer,
            get().keyboardLetterState,
            get().wordsRemaining
          );
          console.log(
            "result",
            rows,
            previousGuesses,
            keyboardLetterState,
            guessCount,
            wordsRemaining,
            gameState
          );
          set({
            rows,
            previousGuesses,
            keyboardLetterState,
            guessCount,
            wordsRemaining,
            gameState,
          });


        -------------




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
  guessCount: 0,

  wordsRemaining: Array(GUESS_LENGTH).fill(null),
  gameState: "playing",
  keyboardLetterState: {},
  startTime: null,

  // insertGuess,
  startGame: () => set({ gameState: "playing", startTime: 0 }),
  newGame: () => {
    set({
      answer: rand_word(),
      rows: new_rows(),
      previousGuesses: [],
      startTime: null,
      wordsRemaining: Array(GUESS_LENGTH).fill(null),
      gameState: "preGame",
      keyboardLetterState: {},

      guessCount: 0,
    });
  },
};

*/

function new_rows(): GuessRow[] {
  const guess = "";
  const gradedGuess = null;
  const emptyRows = Array(GUESS_LENGTH).fill("");
  return emptyRows;
}

export function reset_store(): void {
  useStore.persist.clearStorage();
  // console.log("reset the storage");
}
