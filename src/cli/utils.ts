import { writeFileSync } from "fs";

const indexFileTemplate = `import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

const preprocess = (text: string) =>
  text.split("\\n").map((line) => parseInt(line));

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
`;

const solutionFileTemplate = (isPartTwo: boolean) => `export const part${
  isPartTwo ? "Two" : "One"
} = (input: number[]) => {
  return 0;
};
`;

export const padWithZero = (num: number) => String(num).padStart(2, "0");

export const createDay = (day: number) => {
  const path = `src/solutions/${padWithZero(day)}`;
  writeFileSync(`${path}/index.ts`, indexFileTemplate);
  writeFileSync(`${path}/partOne.ts`, solutionFileTemplate(false));
  writeFileSync(`${path}/partTwo.ts`, solutionFileTemplate(true));
  writeFileSync(`${path}/input.txt`, "");
  writeFileSync(`${path}/sample.txt`, "");
};
