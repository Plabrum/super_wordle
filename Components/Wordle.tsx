import { useEffect, useState } from "react";
import { useStore } from "../store";
import { isValidWord, words_left } from "../utils/word_utils";
import Keyboard from "./Keyboard";
import { WordRow } from "./WordRow";

export const GUESS_QUANTITY = 6;
export const WORD_LENGTH = 5;

export default function Wordle() {
  const state = useStore();
  const [shake, setShake] = useState(false);
  const startShake = () => {
    // Button begins to shake
    setShake(true);

    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 500);
  };
  const [currentGuess, setCurrentGuess] = useState("");
  const insertGuess = useStore((s) => s.insertGuess);

  const unusedWord = (word: string): boolean => {
    return !state.previousGuesses.includes(word);
  };

  function addGuessLetter(letter: string): void {
    let previous: string = " ";
    setCurrentGuess((curGuess) => {
      // patch for the double run bug
      if (curGuess === previous) {
        return "";
      }

      const is_text = letter.toUpperCase() != letter.toLowerCase();
      let proposedGuess =
        letter.length === 1 && is_text ? curGuess + letter : curGuess;
      switch (letter) {
        case "Backspace":
          return curGuess.slice(0, -1);
        case "Delete":
          return "";
        case " ":
          return curGuess;
        case "Enter":
          if (proposedGuess.length === WORD_LENGTH) {
            if (isValidWord(proposedGuess) && unusedWord(proposedGuess)) {
              insertGuess(proposedGuess);
              previous = proposedGuess;
              return "";
            } else {
              startShake();
              return curGuess;
            }
          }
      }
      if (proposedGuess.length > WORD_LENGTH) {
        return curGuess;
      } else {
        return proposedGuess;
      }
    });
  }

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

  let rows = [...state.rows];
  let current_row = state.guessCount;

  const remaining: number[] = state.wordsRemaining;

  return (
    <main className="grid grid-rows-6 gap-2 z-0">
      {rows.map(({ guess, gradedGuess }, index) => (
        <WordRow
          key={index}
          letters={index === current_row ? currentGuess : guess}
          gradedGuess={gradedGuess}
          remaining={remaining[index]}
          className={index === current_row && shake ? "animate-bounce" : ""}
        />
      ))}
      <Keyboard addGuessLetter={addGuessLetter} />
    </main>
  );
}
