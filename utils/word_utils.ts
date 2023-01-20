import la from "../dictionaries/wordle-La.json";

export function rand_word() {
  return la[Math.floor(Math.random() * la.length)];
}

export function words_left(letterDict: { [letter: string]: LetterState }) {
  const regex = new RegExp("/contact\\b", "g");
  const remaing_words = la.filter((word) => word.match(regex));
  const quantity = remaing_words.length;
  console.log("words_left", quantity);

  return quantity;
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(guessString: string, answerString: string) {
  // Defaul the results to wrong
  let result: LetterState[] = [];
  // Convert strings to arrays for easy iteration
  const guessArray = guessString.split("");
  const answerArray = answerString.split("");
  const remaining = answerString.split("");

  // Sanity check
  if (guessArray.length != answerString.length) {
    return result;
  }
  result = Array(5).fill(LetterState.Miss);

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

export function isValidWord(word: string): boolean {
  return la.includes(word);
}
