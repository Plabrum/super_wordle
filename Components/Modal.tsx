import React from "react";
import { useStore } from "../store";
import { LetterState } from "../utils/word_utils";
import { WORD_LENGTH } from "./Wordle";
import { WordRow } from "./WordRow";

export default function Modal() {
  const state = useStore();
  const gameState: string = state.gameState;
  //   const answer: string = state.answer;
  const answer = state.answer.split("");

  return gameState !== "playing" ? (
    <div className="z-10 fixed top-0 left-0 right-0 h-screen w-screen backdrop-blur-sm bg-black/30">
      <div
        className="absolute right-0 left-0 mx-auto bg-white rounded-3xl text-center
       top-1/3 p-6 sm:w-1/4 w-3/4 flex flex-col items-center"
      >
        <h1 className="font-bold text-xl">
          {gameState === "won" ? "You Won!" : "Unlucky, Try Again?"}
        </h1>
        <div>
          <h5>The correct word was:</h5>
          <div className="flex flex-row gap-1 mt-4">
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

        <button
          className="mt-4 bg-blue-500 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow"
          onClick={state.newGame}
        >
          New Game
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
// export function Modal2() {
//   return (
//     <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-nonerelative w-auto my-6 mx-auto max-w-sm">
//       <div className="border-6 rounded-lg shadow-lg relative flex flex-col w-full bg-green-400 outline-none focus:outline-none">
//         <div className="flex flex-col items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
//           <h3 className="text-3xl font=semibold">General Info</h3>
//         </div>
//         <div className="relative p-6 flex-auto"></div>
//         <div className="flex items-center justify-end p-6 border-t rounded-b">
//           <button
//             className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
//             type="button"
//           >
//             Close
//           </button>
//           <button
//             className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//             type="button"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
