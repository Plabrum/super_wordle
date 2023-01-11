import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Wordle from "../Components/Wordle";
import testing from "../utils/testing";

const Home: NextPage = () => {
  // const word = DynamicRandWord();
  // const tests = testing();
  return (
    <div className="">
      <Head>
        <title>Phil | Software Engineer</title>
        <meta name="description" content="Wordle Demo" />
      </Head>
      <header>
        <div className="text-center m-auto">
          <h1 className="text-gray-700 border-b border-b-gray-300 mb-6 py-6 text-xl font-mono">
            Super Wordle!
          </h1>
        </div>
      </header>
      <main>
        <Wordle />
      </main>
      {/* <h1 className="text-center m-auto text-lg">Random Word {word}</h1> */}
    </div>
  );
};

export default Home;
