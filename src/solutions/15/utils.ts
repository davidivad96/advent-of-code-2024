export const replaceAt = (str: string, i: number, replace: string) =>
  str.slice(0, i) + replace + str.slice(i + 1);

export type Direction = "^" | ">" | "v" | "<";

export const directions: Record<Direction, [number, number]> = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

export const updateRobotPos = (
  map: string[],
  i: number,
  j: number,
  di: number,
  dj: number
) => {
  map[i] = replaceAt(map[i], j, ".");
  i += di;
  j += dj;
  map[i] = replaceAt(map[i], j, "@");
  return { i, j };
};
