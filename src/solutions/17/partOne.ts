import { Input } from ".";
import { executeProgram } from "./utils";

export const partOne = ({ registers, program }: Input) =>
  executeProgram(registers, program);
