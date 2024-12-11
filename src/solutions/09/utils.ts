export const replaceAt = (str: string, i: number, replace: string) =>
  str.slice(0, i) + replace + str.slice(i + 1);
