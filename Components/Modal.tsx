import Link from "next/link";
import React, { useState } from "react";
import { useStore } from "../store";
import { format_time } from "../utils/time_uils";
// import { LetterState } from "../utils/word_utils";
// import { WORD_LENGTH } from "./Wordle";
// import { WordRow } from "./WordRow";

import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";

// Create a single supabase client for interacting with your database

// async function add_time(time: string, time_str: string, name: string) {
//   error && console.log("error", error);
// }
export default function Modal() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const state = useStore();
  const gameState: string = state.gameState;
  const answer = state.answer.split("");
  const endTime = useStore((store) => store.endTime);
  async function handleSubmit(event: any) {
    if (endTime && name) {
      const timestamp = new Date(endTime).toISOString();
      const { error } = await supabase.from("leaderboard").insert({
        name: name,
        time_string: format_time(endTime),
        time: timestamp,
      });

      if (error) {
        setResponse("Error Submitting Name");
        console.log("Error", error);
      } else {
        router.push("/leaderboard");
        state.newGame();
        setResponse("Success");
      }
    } else if (!name) {
      setResponse("Please enter a name");
    } else {
      console.log("null endtime...?");
    }
  }

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
          <form
            className="flex flex-col px-2 py-4  space-y-2 items-center bg-green-500 rounded-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <input
              className="border rounded-lg text-center px-2 py-1"
              placeholder="Player Name "
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="font-bold font-sm text-white px-4 "
              type="submit"
            >
              Add Time to Leaderboard
            </button>
          </form>
        )}
        {gameState === "won" && response && (
          <div
            className={
              response === "Success"
                ? "bg-blue-500 text-white px-4 py-1 rounded-md"
                : "bg-red-400 text-white px-4 py-1 rounded-md"
            }
          >
            {response}
          </div>
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
