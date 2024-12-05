import { Input } from ".";
import { isCorrect } from "./utils";

const isSameArray = (arr1: number[], arr2: number[]) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const fixPage = (page: number[], rules: [number, number][]) => {
  const copy = [...page];
  while (!isCorrect(copy, rules)) {
    for (let i = 0; i < copy.length - 1; i++) {
      if (
        !rules.find((rule) => rule[0] === copy[i] && rule[1] === copy[i + 1])
      ) {
        const aux = copy[i];
        copy[i] = copy[i + 1];
        copy[i + 1] = aux;
        i = 0;
      }
    }
  }
  return copy;
};

export const partTwo = ({ rules, pages }: Input) =>
  pages.reduce((prev, curr) => {
    const fixedPage = fixPage(curr, rules);
    return (
      prev +
      (!isSameArray(fixedPage, curr)
        ? fixedPage[Math.floor(fixedPage.length / 2)]
        : 0)
    );
  }, 0);
