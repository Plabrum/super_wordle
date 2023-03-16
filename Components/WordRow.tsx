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
    <div className="mx-6 ">
      <div className={`grid grid-cols-5 gap-2 sm:w-96 sm:mx-auto ${className}`}>
        {letters.map((char, ind) => (
          <CharacterBox key={ind} value={char} state={gradedGuess[ind]} />
        ))}
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
    <div
      className={`border-2 flex rounded-md aspect-square justify-center items-center uppercase  ${stateStyles}`}
    >
      {value ? (
        <p className=" text-center font-bold  text-3xl">{value}</p>
      ) : (
        <p className=" text-transparent text-center font-bold text-3xl">
          {"_"}
        </p>
      )}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500 text-white",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500 text-white",
  [LetterState.Match]: "bg-green-500 border-green-500 text-white",
};
