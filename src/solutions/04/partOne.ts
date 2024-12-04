import { reverseString } from "./utils";

const getWordsAround = (input: string[], i: number, j: number) => [
  // Forward
  input[i].slice(j, j + 4),
  // Backwards
  reverseString(input[i].slice(j - 3, j + 1)),
  // Vertical - up
  reverseString(
    `${input[i - 3]?.[j] || ""}${input[i - 2]?.[j] || ""}${
      input[i - 1]?.[j] || ""
    }${input[i][j]}`
  ),
  // Vertical - down
  `${input[i][j]}${input[i + 1]?.[j] || ""}${input[i + 2]?.[j] || ""}${
    input[i + 3]?.[j] || ""
  }`,
  // Diagonal - up right
  `${input[i][j]}${input[i - 1]?.[j + 1] || ""}${input[i - 2]?.[j + 2] || ""}${
    input[i - 3]?.[j + 3] || ""
  }`,
  // Diagonal - down right
  `${input[i][j]}${input[i + 1]?.[j + 1] || ""}${input[i + 2]?.[j + 2] || ""}${
    input[i + 3]?.[j + 3] || ""
  }`,
  // Diagonal - up left
  `${input[i][j]}${input[i - 1]?.[j - 1] || ""}${input[i - 2]?.[j - 2] || ""}${
    input[i - 3]?.[j - 3] || ""
  }`,
  // Diagonal - down left
  `${input[i][j]}${input[i + 1]?.[j - 1] || ""}${input[i + 2]?.[j - 2] || ""}${
    input[i + 3]?.[j - 3] || ""
  }`,
];

export const partOne = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      sum += getWordsAround(input, i, j).filter(
        (word) => word === "XMAS"
      ).length;
    }
  }
  return sum;
};
