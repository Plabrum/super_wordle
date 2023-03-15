import Link from "next/link";
import React from "react";
import { useStore } from "../store";
import { format_time } from "../utils/time_uils";
// import { LetterState } from "../utils/word_utils";
// import { WORD_LENGTH } from "./Wordle";
// import { WordRow } from "./WordRow";

export default function Modal() {
  const state = useStore();
  const gameState: string = state.gameState;
  //   const answer: string = state.answer;
  const answer = state.answer.split("");
  const endTime = useStore((store) => store.endTime);

  return (
    <div className="fixed top-0 left-0 right-0 h-screen w-screen backdrop-blur-sm bg-black/30">
      <div
        className="absolute right-0 left-0 mx-auto bg-white rounded-3xl text-center
       top-1/3 p-6 sm:w-1/4 w-3/4 flex flex-col gap-y-4 items-center"
      >
        <h1 className="font-bold text-xl">
          {gameState === "won" ? "You Won!" : "Unlucky, Try Again?"}
        </h1>

        <div>
          <h5 className="">The correct word was:</h5>
          <div className="flex flex-row gap-1">
            {answer.map((char, ind) => (
              <div
                key={ind}
                className={`inline-block border-2 px-2 uppercase font-bold text-center 
              text-3xl text-md rounded-md text-white ${
                gameState === "won"
                  ? "bg-green-500 border-green-500"
                  : "bg-red-500 border-red-500"
              }`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
        {gameState === "won" && (
          <div className=" border-2 px-2 text-lg rounded-md font-mono">
            <h2 className="">Time:</h2>
            <h2>{format_time(endTime)}</h2>
          </div>
        )}
        {gameState === "won" && (
          <Link
            href="/leaderboard"
            className="font-bold font-sm bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Add Time to Leaderboard
          </Link>
        )}

        <button
          className=" bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow"
          onClick={state.newGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
