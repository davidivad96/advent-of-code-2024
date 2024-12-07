export type Operator = "+" | "*" | "||";

export const getOperatorsArray = (arr: Operator[], n: number) => {
  if (n === 1) {
    return arr.map((item) => [item]);
  }

  const combinations = [];
  const smallerCombinations = getOperatorsArray(arr, n - 1);

  for (const smallCombo of smallerCombinations) {
    for (const item of arr) {
      combinations.push([...smallCombo, item]);
    }
  }

  return combinations;
};

export const calculateResult = (
  numbers: number[],
  operators: Operator[]
): number =>
  numbers
    .slice(1)
    .reduce(
      (result, number, index) =>
        operators[index] === "+"
          ? result + number
          : operators[index] === "*"
          ? result * number
          : +`${result}${number}`,
      numbers[0]
    );

export const isValidCombination = (
  value: number,
  numbers: number[],
  operators: Operator[]
): boolean => calculateResult(numbers, operators) === value;
