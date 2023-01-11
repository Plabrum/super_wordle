import rand_word from "./rand_word";

const word = rand_word();
console.log(word);
export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(guessString: string, answerString: string = word) {
  // Defaul the results to wrong
  const result: LetterState[] = Array(5).fill(LetterState.Miss);
  // Convert strings to arrays for easy iteration
  const guessArray = guessString.split("");
  const answerArray = answerString.split("");
  const remaining = answerString.split("");

  // Sanity check
  if (guessArray.length != answerString.length) {
    return result;
  }

  function remove_first(remainingArray: Array<string>, value: string) {
    remainingArray.forEach((letter, index) => {
      if (letter === value) {
        remainingArray[index] = "";
        return remainingArray;
      }
    });
  }

  // Take correct guesses out of play first
  guessArray.forEach((letter, index) => {
    if (letter === answerArray[index]) {
      result[index] = LetterState.Match;
      remove_first(remaining, letter);
    }
  });

  guessArray.forEach((letter, index) => {
    if (remaining.includes(letter) && letter != answerArray[index]) {
      result[index] = LetterState.Present;
      remove_first(remaining, letter);
    }
  });

  return result;
}
