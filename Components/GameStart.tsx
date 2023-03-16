import React, { useEffect, useState } from "react";
import { useStore } from "../store";

type Props = {};

export default function GameStart({}: Props) {
  const beginGame = useStore((e) => e.startGame);
  const [gameStarted, setGameStarted] = useState<null | string>(null);
  useEffect(() => {
    console.log("Starting game");
    gameStarted && beginGame();
  });
  return (
    <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur-sm bg-black/30">
      <div
        className="absolute right-0 left-0 mx-auto bg-white rounded-xl text-center
       top-1/3 p-6 sm:w-1/4 w-3/4 flex flex-col items-center"
      >
        <h1 className="font-bold text-xl">Super Wordle Instructions</h1>
        <h2 className="text-md mt-2">
          Unlike normal wordle, this version has a timer. Complete the game as
          fast as you can and earn a place on the leaderboard!
        </h2>

        <button
          className="mt-4 bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow"
          onClick={() => setGameStarted("Begin")}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
