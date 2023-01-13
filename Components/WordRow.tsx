import { useStore } from "../store";
import { computeGuess, LetterState } from "../utils/word_utils";

export const WORD_LENGTH = 5;
interface WordRowProps {
  letters: string;
}
export function WordRow({ letters: lettersProp = "" }: WordRowProps) {
  const answer = useStore((state) => state.answer);

  const lettersRemaining = WORD_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessState = computeGuess(lettersProp, answer);

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, ind) => (
        <CharacterBox key={ind} value={char} state={guessState[ind]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? " " : characterStateStyles[state];
  return (
    <span
      className={`inline-block border-2 border-gray-500 p-4 
    uppercase font-bold text-center text-2xl ${stateStyles}`}
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
