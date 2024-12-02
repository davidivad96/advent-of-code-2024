import { isSafe } from "./utils";

export const partOne = (input: number[][]) =>
  input.reduce((prev, curr) => prev + (isSafe(curr) ? 1 : 0), 0);
