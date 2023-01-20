import { useEffect, useState } from "react";
import { useStore } from "../store";
import { isValidWord, words_left } from "../utils/word_utils";
import Keyboard from "./Keyboard";
import { WordRow } from "./WordRow";

export const GUESS_QUANTITY = 6;
export const WORD_LENGTH = 5;

export default function Wordle() {
  const state = useStore();
  //   const [showInvalidGuess, setInvalidGuess] = useState(false);
  let rows = [...state.rows];
  let current_row = state.guessCount;
  const currentGameState = state.gameState;

  const unusedWord = (word: string): boolean => {
    return !state.previousGuesses.includes(word);
  };
  const [currentGuess, addGuessLetter] = useLetterHandler(unusedWord);
  // Calculate remaining words
  const remaining: number[] = state.wordsRemaining;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
    }
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <main className="grid grid-rows-6 gap-2 z-0">
      {rows.map(({ guess, gradedGuess }, index) => (
        <WordRow
          key={index}
          letters={index === current_row ? currentGuess : guess}
          gradedGuess={gradedGuess}
          remaining={remaining[index]}
          //   className={
          //     // showInvalidGuess && current_row === index ? "animate-bounce" : ""
          //   }
        />
      ))}
      <Keyboard letter_handler={addGuessLetter} />
    </main>
  );
}

function useLetterHandler(unusedWord: any): [
  string,
  //   React.Dispatch<React.SetStateAction<string>>
  (letter: string) => void
] {
  // Takes a letter and adds it to the current guess
  const [currentGuess, setCurrentGuess] = useState("");
  const insertGuess = useStore((s) => s.insertGuess);

  let previous_guess: string = "";

  const addGuessLetter = (letter: string) => {
    setCurrentGuess((curGuess: string) => {
      const is_text = letter.toUpperCase() != letter.toLowerCase();
      let proposedGuess = letter.length === 1 ? curGuess + letter : curGuess;
      switch (letter) {
        case "Backspace":
          return curGuess.slice(0, -1);
        case " ":
          return curGuess;
        case "META":
          return curGuess;
        case "Enter":
          if (proposedGuess.length === WORD_LENGTH) {
            if (isValidWord(proposedGuess)) {
              //   avoiding the double add
              if (proposedGuess !== previous_guess) {
                previous_guess = proposedGuess;
                if (unusedWord(proposedGuess)) {
                  insertGuess(proposedGuess);
                }
              }

              return "";
            }
          }
      }
      if (proposedGuess.length > WORD_LENGTH) {
        return curGuess;
      } else {
        return proposedGuess;
      }
    });
  };

  return [currentGuess, addGuessLetter];
}
