import { LetterState } from "../utils/word_utils";

export const WORD_LENGTH = 5;
interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}
export function WordRow({
  letters: lettersProp = "",
  result = [],
  className = "",
}: WordRowProps) {
  const lettersRemaining = WORD_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, ind) => (
        <CharacterBox key={ind} value={char} state={result[ind]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null ? "border-gray-500" : characterStateStyles[state];
  return (
    <span
      className={`inline-block border-2 p-4 uppercase font-bold text-center lg:text-2xl text-sm ${stateStyles} before:inline-block before:content['-']`}
    >
      {/* This is causing a warning */}
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
  [LetterState.Match]: "bg-green-500 border-green-500",
};
