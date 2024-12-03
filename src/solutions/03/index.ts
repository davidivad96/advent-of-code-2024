import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

const preprocess = (text: string) => text;

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
