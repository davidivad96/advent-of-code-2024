export const partOne = (input: number[]) => {
  const n = 25;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < input.length; j++) {
      const current = input[j];
      const splitted = current.toString().split("");
      if (current === 0) {
        input[j] = 1;
      } else if (splitted.length % 2 === 0) {
        const [left, right] = [
          splitted.slice(0, splitted.length / 2),
          splitted.slice(splitted.length / 2),
        ];
        input[j] = +left.join("");
        input.splice(j + 1, 0, +right.join(""));
        j++;
      } else {
        input[j] *= 2024;
      }
    }
  }
  return input.length;
};
