import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Input = {
  rules: [number, number][];
  pages: number[][];
};

const preprocess = (text: string) => {
  const [first, second] = text.split("\n\n");
  const rules = first.split("\n").map((rule) => rule.split("|").map(Number));
  const pages = second.split("\n").map((page) => page.split(",").map(Number));
  return { rules, pages } as Input;
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
