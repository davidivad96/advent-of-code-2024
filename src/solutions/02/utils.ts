export const isSafe = (report: number[]) => {
  const isIncreasing = report[1] > report[0] && report[2] > report[1];
  const invalidAdjacentLevels = (a: number, b: number) =>
    isIncreasing ? a < b : a > b;
  for (let i = 1; i < report.length; i++) {
    const difference = Math.abs(report[i] - report[i - 1]);
    if (
      invalidAdjacentLevels(report[i], report[i - 1]) ||
      ![1, 2, 3].includes(difference)
    )
      return false;
  }
  return true;
};
