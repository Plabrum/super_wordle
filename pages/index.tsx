import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Keyboard from "../Components/Keyboard";
import { WordRow, WORD_LENGTH } from "../Components/WordRow";
import { useStore } from "../store";
import { isValidWord } from "../utils/word_utils";

const GUESS_QUANTITY = 6;

function Modal({ gameState }: string) {
  if (gameState !== "playing") {
    return (
      <div
        role="modal"
        className="
          absolute bg-white rounded border-4 border-gray-900 text-center
          left-0 right-0 top-1/4 p-6 w-3/4 mx-auto"
      >
        GAME OVER
        <button
          className="block border rounded border-green-500
             bg-green-500 p-2 mt-4 mx-auto shadow"
          onClick={() => {
            state.newGame();
            setGuess("");
          }}
        >
          New Game
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const Home: NextPage = () => {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 750);
    }
    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  let rows = [...state.rows];
  let current_row = 0;
  if (rows.length < GUESS_QUANTITY) {
    current_row = rows.push({ guess }) - 1;
  }

  const isGameOver: boolean = state.gameState !== "playing";
  const guessRemaining = GUESS_QUANTITY - rows.length;
  rows = rows.concat(Array(guessRemaining).fill(""));

  return (
    <div className="mx-auto sm:w-96 w-11/12 relative">
      <Head>
        <title>Super Wordle Demo</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <header
        className="text-gray-700 border-b border-b-gray-300 
      mb-6 py-6 text-xl font-mono"
      >
        <h1 className="text-center">Super Wordle!</h1>
      </header>

      <main className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow
            key={index}
            letters={guess}
            result={result}
            className={
              showInvalidGuess && current_row === index ? "animate-bounce" : ""
            }
          />
        ))}
      </main>
      <Keyboard
        onClick={(letter) => {
          addGuessLetter(letter);
        }}
      />
      {state.gameState !== "playing" && (
        <div
          role="modal"
          className="
          absolute bg-white rounded border-4 border-gray-900 text-center
          left-0 right-0 top-1/4 p-6 w-3/4 mx-auto"
        >
          {state.gameState === "won" ? "You Won!" : "Unlucky, Try Again?"}
          <button
            className="block border rounded border-green-500
             bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState("");
  const addGuessLetter = (letter: string) => {
    setGuess((currGuess) => {
      const newGuess = letter.length === 1 ? currGuess + letter : currGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === letter.length) {
            return "";
          }
      }

      if (currGuess.length === WORD_LENGTH) {
        return currGuess;
      }
      return newGuess;
    });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

// Hook
function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default Home;
