const isXmas = (input: string[], i: number, j: number) =>
  input[i][j] === "A" &&
  ((input[i - 1]?.[j - 1] === "M" && input[i + 1]?.[j + 1] === "S") ||
    (input[i - 1]?.[j - 1] === "S" && input[i + 1]?.[j + 1] === "M")) &&
  ((input[i + 1]?.[j - 1] === "M" && input[i - 1]?.[j + 1] === "S") ||
    (input[i + 1]?.[j - 1] === "S" && input[i - 1]?.[j + 1] === "M"));

export const partTwo = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      sum += isXmas(input, i, j) ? 1 : 0;
    }
  }
  return sum;
};
