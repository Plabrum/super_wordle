import React from "react";
import { useStore } from "../store";
import { LetterState } from "../utils/word_utils";
import { BackspaceIcon } from "@heroicons/react/24/solid";

interface KeyboardProps {
  addGuessLetter: Function;
}

export default function Keyboard({ addGuessLetter }: KeyboardProps) {
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);
  function letter_select(e: React.MouseEvent<HTMLButtonElement>): void {
    const letter = e.currentTarget.textContent;
    addGuessLetter(letter!);
  }
  return (
    <div className="flex flex-col  mx-1">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-1 ">
            {keyboardRow.map((key, index) => {
              let styles = "rounded font-bold uppercase py-2 flex-1 ";
              const letterState = keyStateStyles[keyboardLetterState[key]];
              if (letterState) {
                styles += ` ${letterState}`;
              } else if (key === "Enter") {
                styles += "px-1 bg-gray-400";
              } else if (key !== "") {
                styles += " bg-gray-400";
              } else if (key === "") {
                styles += " pointer-events-none";
              }
              if (key === "Backspace") {
                return (
                  <BackspaceIcon
                    key={index}
                    className="sm:h-10 sm:w-10 w-8 h-8 my-auto text-gray-400"
                    onClick={() => addGuessLetter("Backspace")}
                  />
                );
              } else {
                return (
                  <button
                    key={index}
                    className={styles}
                    onClick={letter_select}
                  >
                    {key}
                  </button>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"],
  ["", "z", "x", "c", "v", "b", "n", "m", "Enter"],
];

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-500 ",
  [LetterState.Present]: "bg-yellow-500 ",
  [LetterState.Match]: "bg-green-500 ",
};
