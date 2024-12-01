import { sortNumbersArray } from "./utils";

export const partOne = (input: [number[], number[]]) => {
  const sortedFirstColumn = sortNumbersArray(input[0]);
  const sortedSecondColumn = sortNumbersArray(input[1]);
  return sortedFirstColumn.reduce(
    (prev, curr, i) => prev + Math.abs(curr - sortedSecondColumn[i]),
    0
  );
};
