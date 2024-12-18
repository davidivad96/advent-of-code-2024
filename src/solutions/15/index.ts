import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Input = {
  map: string[];
  movements: string;
};

const preprocess = (text: string): Input => {
  const [rawMap, movements] = text.split("\n\n");
  return { map: rawMap.split("\n"), movements };
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
