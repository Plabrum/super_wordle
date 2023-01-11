import { type } from "os";
import { computeGuess, LetterState } from "./compute_guess";

export default function Testing() {
  function compare_arrays(a: Array<LetterState>, b: Array<LetterState>) {
    let all_true = true;
    a.forEach((letter, index) => {
      all_true = all_true && letter === b[index];
    });
    return all_true;
  }

  function test(a, b) {
    if (a instanceof Array) {
      return compare_arrays(a, b) ? "Passed" : ["Failed", a];
    } else {
      return a === b ? "Passed" : ["Failed", a];
    }
  }

  const test_results = [];
  const q1 = computeGuess("alloy", "colon");
  const ans1 = [
    LetterState.Miss,
    LetterState.Miss,
    LetterState.Match,
    LetterState.Match,
    LetterState.Miss,
  ];
  test_results.push(test(q1, ans1));

  const q2 = computeGuess("colon", "alloy");
  const ans2 = [
    LetterState.Miss,
    LetterState.Miss,
    LetterState.Match,
    LetterState.Match,
    LetterState.Miss,
  ];
  test_results.push(test(q2, ans2));

  const q3 = computeGuess("ablat", "black");
  const ans3 = [
    LetterState.Present,
    LetterState.Present,
    LetterState.Present,
    LetterState.Miss,
    LetterState.Miss,
  ];
  test_results.push(test(q3, ans3));

  const q4 = computeGuess("black", "ablat");
  const ans4 = [
    LetterState.Present,
    LetterState.Present,
    LetterState.Present,
    LetterState.Miss,
    LetterState.Miss,
  ];
  test_results.push(test(q4, ans4));

  const q5 = computeGuess("allol", "smelt");
  const ans5 = [
    LetterState.Miss,
    LetterState.Present,
    LetterState.Miss,
    LetterState.Miss,
    LetterState.Miss,
  ];
  test_results.push(test(q5, ans5));

  console.log(test_results);
}
