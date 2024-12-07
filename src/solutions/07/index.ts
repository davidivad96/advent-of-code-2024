import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Equation = {
  value: number;
  numbers: number[];
};

export type Input = Equation[];

const preprocess = (text: string) => {
  const equations = text.split("\n");
  const input: Input = [];
  for (const equation of equations) {
    const splittedEquation = equation.split(": ");
    input.push({
      value: +splittedEquation[0],
      numbers: splittedEquation[1].split(" ").map(Number),
    });
  }
  return input;
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
