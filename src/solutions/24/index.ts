import { partOne } from "./partOne";
import { partTwo } from "./partTwo";

export type Operation = "AND" | "OR" | "XOR";
export type Gates = Record<string, boolean>;
export type Wire = [string, Operation, string, string];

export type Input = {
  gates: Gates;
  wires: Wire[];
};

const preprocess = (text: string) => {
  const [first, second] = text.split("\n\n");
  const gates = first.split("\n").reduce<Gates>((prev, curr) => {
    const [gate, value] = curr.split(": ");
    return { ...prev, [gate]: value === "1" ? true : false };
  }, {});
  const wires = second
    .split("\n")
    .map((line) => line.split(" ").filter((val) => val !== "->") as Wire);
  return { gates, wires };
};

export const runSolution = (text: string, isPartTwo: boolean) => {
  const input = preprocess(text);
  return isPartTwo ? partTwo(input) : partOne(input);
};
