import { Input } from ".";
import { getOperatorsArray, isValidCombination } from "./utils";

const processEquation = ({
  value,
  numbers,
}: {
  value: number;
  numbers: number[];
}): number =>
  getOperatorsArray(["+", "*", "||"], numbers.length - 1).some((combination) =>
    isValidCombination(value, numbers, combination)
  )
    ? value
    : 0;

export const partTwo = (input: Input) =>
  input.reduce((sum, equation) => sum + processEquation(equation), 0);
