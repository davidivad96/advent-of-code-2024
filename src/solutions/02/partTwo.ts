import { isSafe } from "./utils";

const isSafeWithDampener = (report: number[]) => {
  if (isSafe(report)) return true;
  for (let i = 0; i < report.length; i++) {
    if (isSafe([...report.slice(0, i), ...report.slice(i + 1)])) {
      return true;
    }
  }
  return false;
};

export const partTwo = (input: number[][]) =>
  input.reduce((prev, curr) => prev + (isSafeWithDampener(curr) ? 1 : 0), 0);
