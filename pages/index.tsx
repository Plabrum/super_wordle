import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { WordRow, WORD_LENGTH } from "../Components/WordRow";
import { useStore } from "../store";
import testing from "../utils/testing";

const GUESS_QUANTITY = 6;

const Home: NextPage = () => {
  // const tests = testing();
  const [guess, setGuess] = useState("");
  const state = useStore();

  // React change handler
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    if (newGuess.length === WORD_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }
    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_QUANTITY) {
    rows.push(guess);
  }

  const isGameOver: boolean = state.guesses.length === GUESS_QUANTITY;
  const guessRemaining = GUESS_QUANTITY - rows.length;
  rows = rows.concat(Array(guessRemaining).fill(""));

  return (
    <div className="mx-auto w-96 relative">
      <Head>
        <title>Super Wordle Demo</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <header className="text-gray-700 border-b border-b-gray-300 mb-6 py-6 text-xl font-mono">
        <h1 className="text-center">Super Wordle!</h1>
        <input
          className="w-full p2 border-2 border-gray-500 "
          type="text"
          value={guess}
          onChange={onChange}
          disabled={isGameOver}
        />
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, index) => (
          <WordRow key={index} letters={word} />
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
            className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow"
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

export default Home;
