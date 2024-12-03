const REGEX = /mul\((\d{1,3}),(\d{1,3})\)/g;

export const partOne = (input: string) =>
  [...input.matchAll(REGEX)].reduce(
    (prev, curr) => prev + +curr[1] * +curr[2],
    0
  );
