import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { WordRow, WORD_LENGTH } from "../Components/WordRow";
import { useStore } from "../store";
import testing from "../utils/testing";

const GUESS_QUANTITY = 6;

const Home: NextPage = () => {
  // const tests = testing();
  const state = useStore();
  const [guess, setGuess] = useGuess();

  let rows = [...state.rows];

  if (rows.length < GUESS_QUANTITY) {
    rows.push({ guess });
  }

  const isGameOver: boolean = state.gameState !== "playing";
  const guessRemaining = GUESS_QUANTITY - rows.length;
  rows = rows.concat(Array(guessRemaining).fill(""));

  return (
    <div className="mx-auto w-96 relative">
      <Head>
        <title>Super Wordle Demo</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <header
        className="text-gray-700 border-b border-b-gray-300 
      mb-6 py-6 text-xl font-mono"
      >
        <h1 className="text-center">Super Wordle!</h1>
        {/* <input
          className="w-full p2 border-2 border-gray-500 "
          type="text"
          value={guess}
          onChange={onChange}
          disabled={isGameOver}
        /> */}
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} />
        ))}
      </main>
      {isGameOver && (
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
      )}
    </div>
  );
};

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const addGuess = useStore((s) => s.addGuess);
  const [guess, setGuess] = useState("");
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
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
      } else {
        return newGuess;
      }
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);

  return [guess, setGuess];
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
