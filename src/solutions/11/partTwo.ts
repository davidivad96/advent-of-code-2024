const memory = new Map<string, number>();

const calculate = (stone: number, blinks: number, sum: number) => {
  const key = `${stone},${blinks}`;
  if (memory.has(key)) return memory.get(key);
  const splitted = stone.toString().split("");
  let result: number;
  if (blinks === 0) {
    result = sum + 1;
  } else if (stone === 0) {
    result = calculate(1, blinks - 1, sum);
  } else if (splitted.length % 2 === 0) {
    const [left, right] = [
      splitted.slice(0, splitted.length / 2),
      splitted.slice(splitted.length / 2),
    ];
    result =
      calculate(+left.join(""), blinks - 1, sum) +
      calculate(+right.join(""), blinks - 1, sum);
  } else {
    result = calculate(stone * 2024, blinks - 1, sum);
  }
  memory.set(key, result);
  return result;
};

export const partTwo = (input: number[]) =>
  input.reduce((sum, stone) => sum + calculate(stone, 75, 0), 0);
