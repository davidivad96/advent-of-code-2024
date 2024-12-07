import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Input = {
  map: string[];
  start: [number, number];
};

const preprocess = (text: string) => {
  const map = text.split("\n");
  const i = map.findIndex((row) => row.includes("^"));
  const j = map[i].indexOf("^");
  return { map, start: [i, j] } as Input;
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
