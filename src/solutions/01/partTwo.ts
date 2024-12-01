export const partTwo = (input: [number[], number[]]) =>
  input[0].reduce(
    (prev, curr) => prev + curr * input[1].filter((val) => val === curr).length,
    0
  );
