export const partOne = (input: number[]) => {
  let result: (number | undefined)[] = [];
  for (let i = 0; i < input.length; i++) {
    result.push(
      ...Array.from({ length: input[i] }, () =>
        i % 2 === 0 ? i / 2 : undefined
      )
    );
  }
  let j = result.length - 1;
  for (let i = 0; i < j; i++) {
    if (result[i] === undefined) {
      while (result[j] === undefined) j--;
      result[i] = result[j];
      result = result.slice(0, j);
      j--;
    }
  }
  return result.reduce((sum, val, i) => sum + val * i, 0);
};
