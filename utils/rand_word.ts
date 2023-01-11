import la from "../dictionaries/wordle-La.json";

export default function rand_word() {
  return la[Math.floor(Math.random() * la.length)];
}
