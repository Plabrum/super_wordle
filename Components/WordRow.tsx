import { LetterState } from "../utils/word_utils";
import { WORD_LENGTH } from "./Wordle";

interface WordRowProps {
  letters: string;
  gradedGuess?: LetterState[];
  remaining?: number;
  className?: string;
}
export function WordRow({
  letters: lettersProp = "",
  gradedGuess = [],
  remaining,
  className = "",
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="grid sm:grid-cols-3 grid-cols-12">
      <div className="sm:col-span-1 col-span-1"></div>
      <div
        className={`sm:col-span-1 col-span-10 float-right grid grid-cols-5 sm:gap-4 gap-2 sm:w-96  ${className}`}
      >
        {letters.map((char, ind) => (
          <CharacterBox key={ind} value={char} state={gradedGuess[ind]} />
        ))}
      </div>
      <div className="col-span-1 flex">
        <h1 className="inline-block text-sm mx-1 m-auto">{remaining}</h1>
      </div>
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null ? "border-gray-500 text-black" : characterStateStyles[state];
  return (
    <span
      className={`inline-block border-2 py-4 uppercase font-bold text-center 
      lg:text-2xl text-md  ${stateStyles} before:inline-block before:content['-'] rounded-md`}
    >
      {/* This is causing a warning */}
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500 text-white",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500 text-white",
  [LetterState.Match]: "bg-green-500 border-green-500 text-white",
};
