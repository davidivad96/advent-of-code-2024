import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

const preprocess = (text: string): [number[], number[]] => {
  const firstColumn: number[] = [];
  const secondColumn: number[] = [];
  text.split("\n").forEach((line) => {
    const [first, second] = line.split("   ");
    firstColumn.push(+first);
    secondColumn.push(+second);
  });
  return [firstColumn, secondColumn];
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
