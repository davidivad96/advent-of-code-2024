import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Registers = Record<"A" | "B" | "C", number>;
export type Program = [number, number][];

export type Input = {
  registers: Registers;
  program: Program;
};

const preprocess = (text: string) => {
  const [first, second] = text.split("\n\n");
  const [A, B, C] = first.split("\n");
  const registers: Registers = {
    A: +A.split(": ")[1],
    B: +B.split(": ")[1],
    C: +C.split(": ")[1],
  };
  const instructions = second.split(": ")[1].split(",").map(Number);
  const program = instructions.reduce<Program>((acc, _, index, arr) => {
    if (index % 2 === 0 && index < arr.length - 1) {
      acc.push([arr[index], arr[index + 1]]);
    }
    return acc;
  }, []);
  return { registers, program };
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
