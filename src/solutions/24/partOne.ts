import { Input, Operation } from ".";

const operate = (val1: boolean, val2: boolean, operation: Operation) => {
  if (val1 === undefined || val2 === undefined) return undefined;
  if (operation === "AND") return val1 && val2;
  if (operation === "OR") return val1 || val2;
  if (operation === "XOR") return val1 != val2;
};

export const partOne = ({ gates, wires }: Input) => {
  while (true) {
    for (const [first, operation, second, result] of wires) {
      gates[result] = operate(gates[first], gates[second], operation);
    }
    if (Object.values(gates).every((val) => val !== undefined)) break;
  }
  return parseInt(
    Object.keys(gates)
      .filter((val) => val.startsWith("z"))
      .sort()
      .reduce((prev, curr) => +gates[curr] + prev, ""),
    2
  );
};
