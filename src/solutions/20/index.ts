import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Input = {
  racetrack: string[];
  start: [number, number];
  end: [number, number];
};

const preprocess = (text: string) => {
  const racetrack = text.split("\n");
  let start: [number, number] = [-1, -1];
  let end: [number, number] = [-1, -1];
  racetrack.forEach((line, i) => {
    const indexStart = line.indexOf("S");
    const indexEnd = line.indexOf("E");
    if (indexStart !== -1) start = [i, indexStart];
    if (indexEnd !== -1) end = [i, indexEnd];
  });
  return { racetrack, start, end };
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
