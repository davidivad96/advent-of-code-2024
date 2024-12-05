export const isCorrect = (page: number[], rules: [number, number][]) => {
  for (let i = 0; i < page.length - 1; i++) {
    if (!rules.find((rule) => rule[0] === page[i] && rule[1] === page[i + 1])) {
      return false;
    }
  }
  return true;
};
