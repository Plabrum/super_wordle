import React from "react";
import WordRow from "./WordRow";

export default function Wordle() {
  return (
    <div className="mx-auto w-96 grid grid-rows-6 gap-4">
      <WordRow letters="hello" />
      <WordRow letters="solar" />
      <WordRow letters="penny" />
      <WordRow letters="stare" />
      <WordRow letters="pet" />
    </div>
  );
}
