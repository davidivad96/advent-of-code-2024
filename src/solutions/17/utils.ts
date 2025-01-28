import { Program, Registers } from ".";

export const executeProgram = (registers: Registers, program: Program) => {
  const copy = { ...registers };
  const output: number[] = [];
  const getComboValue = (val: number) => {
    if (val < 4) return val;
    return val === 4 ? copy.A : val === 5 ? copy.B : copy.C;
  };
  for (let i = 0; i < program.length; i++) {
    const [instruction, operand] = program[i];
    if (instruction === 0) {
      copy.A = Math.trunc(copy.A / Math.pow(2, getComboValue(operand)));
    } else if (instruction === 1) {
      copy.B ^= operand;
    } else if (instruction === 2) {
      copy.B = getComboValue(operand) % 8;
    } else if (instruction === 3) {
      if (copy.A !== 0) i = operand / 2 - 1;
    } else if (instruction === 4) {
      copy.B ^= copy.C;
    } else if (instruction === 5) {
      output.push(getComboValue(operand) % 8);
    } else if (instruction === 6) {
      copy.B = Math.trunc(copy.A / Math.pow(2, getComboValue(operand)));
    } else if (instruction === 7) {
      copy.C = Math.trunc(copy.A / Math.pow(2, getComboValue(operand)));
    }
  }
  return output.join(",");
};
