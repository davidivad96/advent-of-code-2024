const REGEX = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don[']t\(\)/g;

export const partTwo = (input: string) => {
  let enabled = true;
  return [...input.matchAll(REGEX)].reduce((prev, curr) => {
    const [match, num1, num2] = curr;
    const actions = {
      "do()": () => (enabled = true),
      "don't()": () => (enabled = false),
      default: () => (enabled && num1 && num2 ? prev + +num1 * +num2 : prev),
    };
    return (actions[match] || actions.default)();
  }, 0);
};
