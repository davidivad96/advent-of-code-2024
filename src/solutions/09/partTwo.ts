export const partTwo = (input: number[]) => {
  let result: (number[] | undefined[])[] = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] > 0) {
      result.push(
        Array.from({ length: input[i] }, () =>
          i % 2 === 0 ? i / 2 : undefined
        )
      );
    }
  }
  for (let j = result.length - 1; j > 0; j--) {
    if (!result[j].includes(undefined)) {
      for (let i = 0; i < j; i++) {
        const numSpaces = result[i].filter((val) => val === undefined).length;
        if (numSpaces >= result[j].length) {
          const part1 = result[i].slice(0, result[i].indexOf(undefined));
          const part2 = result[j];
          const part3 = Array.from(
            { length: result[i].length - part1.length - part2.length },
            () => undefined
          );
          result[i] = [...part1, ...part2, ...part3];
          result[j] = Array.from({ length: result[j].length }, () => undefined);
          break;
        }
      }
    }
  }
  return result.flat().reduce((sum, val, i) => sum + (val ?? 0) * i, 0);
};
