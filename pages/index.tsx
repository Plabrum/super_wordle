import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
// import Keyboard from "../Components/Keyboard";
import Modal from "../Components/Modal";
import Wordle from "../Components/Wordle";
import { useStore, reset_store } from "../store";

export const GUESS_QUANTITY = 6;
export const WORD_LENGTH = 5;

const Home: NextPage = () => {
  // console.log("Answer", state.answer);

  return (
    <div className="mx-auto relative">
      <Head>
        <title>Super Wordle Demo</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <div
        className=" text-gray-700 border-b border-b-gray-300 
      mb-6  text-xl font-mono w-96 mx-auto content-center flex flex-col items-center"
      >
        <h1 className="text-center mt-4 font-bold">Super Wordle!</h1>
        <h3 className="text-center text-sm">
          (but the super bit is yet to come)
        </h3>
        {/* <button
          className="rounded-full px-4  my-2 py-2 bg-red-400 text-white hover:bg-red-600"
          onClick={reset_store}
        >
          Reset (testing)
        </button> */}
      </div>

      <Wordle />
      <Modal />
    </div>
  );
};

export default Home;
