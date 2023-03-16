import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import GameStart from "../Components/GameStart";
// import Keyboard from "../Components/Keyboard";
import Modal from "../Components/Modal";
import Wordle from "../Components/Wordle";
import { useStore, reset_store } from "../store";
import { useRouter } from "next/router";
import Timer from "../Components/Timer";

export const GUESS_QUANTITY = 6;
export const WORD_LENGTH = 5;

const Home: NextPage = () => {
  const gameState: string = useStore((store) => store.gameState);

  const router = useRouter();
  // const answer = state.answer.split("");
  return (
    <div className="">
      <Head>
        <title>Super Wordle</title>
        <meta
          name="description"
          content="Super Wordle is a timed version of the popular wordle game with a public leaderboard"
        />
      </Head>
      <div
        className="lg:w-1/2 w-full mx-auto text-center border-b border-b-gray-300 sm:py-6 py-2 
      sm:mb-10 mb-4 font-mono content-center grid grid-cols-3 items-center justify-center"
      >
        <button
          className="ml-2 justify-self-start rounded-full px-2 py-1 bg-red-300 text-white text-xs hover:bg-red-600"
          onClick={() => {
            reset_store();
            router.reload();
          }}
        >
          Restart
        </button>
        <h1 className=" text-gray-700 md:text-3xl text-xl whitespace-nowrap justify-self-center font-bold">
          Super Wordle
        </h1>

        <Timer />
      </div>
      <Wordle />
      {"won lost".includes(gameState) && <Modal />}
      {gameState == "preGame" && <GameStart />}
    </div>
  );
};

export default Home;
