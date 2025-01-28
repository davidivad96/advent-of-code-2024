import { Input } from ".";
import { executeProgram } from "./utils";

export const partTwo = async ({ registers, program }: Input) => {
  // let A = 35184372000000;
  let A = 85184486986195;
  while (true) {
    const output = executeProgram({ ...registers, A }, program);
    if (output === program.join(",")) return A;
    A++;
  }
};
