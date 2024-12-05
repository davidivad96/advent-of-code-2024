import { Input } from ".";
import { isCorrect } from "./utils";

export const partOne = ({ rules, pages }: Input) =>
  pages.reduce(
    (prev, curr) =>
      prev + (isCorrect(curr, rules) ? curr[Math.floor(curr.length / 2)] : 0),
    0
  );
