import React from "react";
import { useStore } from "../store";
import { LetterState } from "../utils/word_utils";

export default function Keyboard(letter_handler: any) {
  const state = useStore();
  const keyboardLetterState = useStore((s) => s.keyboardLetterState);
  // on button click
  //   const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     const letter = e.currentTarget.textContent;
  //     onClickProp(letter!);
  //   };
  function letter_select(e: React.MouseEvent<HTMLButtonElement>): void {
    const letter = e.currentTarget.textContent;
    letter_handler(letter!);
  }
  return (
    <div className="flex flex-col sm:w-96 sm:mx-auto mx-4">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-1 ">
            {keyboardRow.map((key, index) => {
              let styles = "rounded font-bold uppercase py-2 flex-1 ";
              const letterState = keyStateStyles[keyboardLetterState[key]];
              if (letterState) {
                styles += ` ${letterState}`;
              } else if (key !== "") {
                styles += "bg-gray-400";
              } else if (key === "") {
                styles += "pointer-events-none";
              }
              return (
                <button key={index} className={styles} onClick={letter_select}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-500 ",
  [LetterState.Present]: "bg-yellow-500 ",
  [LetterState.Match]: "bg-green-500 ",
};
