import { Input } from ".";
import { directions, replaceAt, updateRobotPos } from "./utils";

export const partOne = ({ map, movements }: Input) => {
  let initialPos: [number, number] = [-1, -1];
  map.forEach((row, i) => {
    const j = row.indexOf("@");
    if (j !== -1) initialPos = [i, j];
  }, []);
  let [i, j] = initialPos;
  for (const mov of movements) {
    const [di, dj] = directions[mov];
    if ([".", "@"].includes(map[i + di][j + dj])) {
      ({ i, j } = updateRobotPos(map, i, j, di, dj));
    } else if (map[i + di][j + dj] === "O") {
      if (mov === ">") {
        const emptyIndex = map[i].indexOf(".", j + 1);
        const wallIndex = map[i].indexOf("#", j + 1);
        if (emptyIndex !== -1 && emptyIndex < wallIndex) {
          map[i] = replaceAt(map[i], j + 1, ".");
          map[i] = replaceAt(map[i], emptyIndex, "O");
          ({ i, j } = updateRobotPos(map, i, j, di, dj));
        }
      } else if (mov === "<") {
        const emptyIndex = map[i].lastIndexOf(".", j - 1);
        const wallIndex = map[i].lastIndexOf("#", j - 1);
        if (emptyIndex !== -1 && emptyIndex > wallIndex) {
          map[i] = replaceAt(map[i], j - 1, ".");
          map[i] = replaceAt(map[i], emptyIndex, "O");
          ({ i, j } = updateRobotPos(map, i, j, di, dj));
        }
      } else if (mov === "v") {
        const emptyIndex = map.findIndex((row, k) => k > i && row[j] === ".");
        const wallIndex = map.findIndex((row, k) => k > i && row[j] === "#");
        if (emptyIndex !== -1 && emptyIndex < wallIndex) {
          map[i + 1] = replaceAt(map[i + 1], j, ".");
          map[emptyIndex] = replaceAt(map[emptyIndex], j, "O");
          ({ i, j } = updateRobotPos(map, i, j, di, dj));
        }
      } else {
        const emptyIndex = map.findLastIndex(
          (row, k) => k < i && row[j] === "."
        );
        const wallIndex = map.findLastIndex(
          (row, k) => k < i && row[j] === "#"
        );
        if (emptyIndex !== -1 && emptyIndex > wallIndex) {
          map[i - 1] = replaceAt(map[i - 1], j, ".");
          map[emptyIndex] = replaceAt(map[emptyIndex], j, "O");
          ({ i, j } = updateRobotPos(map, i, j, di, dj));
        }
      }
    }
  }
  return map.reduce(
    (sum, row, i) =>
      sum +
      row
        .split("")
        .reduce((prev, curr, j) => prev + (curr === "O" ? 100 * i + j : 0), 0),
    0
  );
};
