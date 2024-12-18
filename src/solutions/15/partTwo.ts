import { Input } from ".";
import { directions, replaceAt, updateRobotPos } from "./utils";

export const partTwo = ({ map, movements }: Input) => {
  const newMap: string[] = [];
  for (const row of map) {
    let newRow = "";
    for (const char of row) {
      newRow += char === "@" ? "@." : char === "O" ? "[]" : char.repeat(2);
    }
    newMap.push(newRow);
  }
  let initialPos: [number, number] = [-1, -1];
  newMap.forEach((row, i) => {
    const j = row.indexOf("@");
    if (j !== -1) initialPos = [i, j];
  }, []);
  let [i, j] = initialPos;
  for (const mov of movements) {
    const [di, dj] = directions[mov];
    if ([".", "@"].includes(newMap[i + di][j + dj])) {
      ({ i, j } = updateRobotPos(newMap, i, j, di, dj));
    } else if (["[", "]"].includes(newMap[i + di][j + dj])) {
      if (mov === ">") {
        const emptyIndex = newMap[i].indexOf(".", j + 1);
        const wallIndex = newMap[i].indexOf("#", j + 1);
        if (emptyIndex !== -1 && emptyIndex < wallIndex) {
          newMap[i] =
            newMap[i].slice(0, j) +
            "." +
            newMap[i].slice(j, emptyIndex) +
            newMap[i].slice(emptyIndex + 1);
          i += di;
          j += dj;
        }
      } else if (mov === "<") {
        const emptyIndex = newMap[i].lastIndexOf(".", j - 1);
        const wallIndex = newMap[i].lastIndexOf("#", j - 1);
        if (emptyIndex !== -1 && emptyIndex > wallIndex) {
          newMap[i] =
            newMap[i].slice(0, emptyIndex) +
            newMap[i].slice(emptyIndex + 1, j + 1) +
            "." +
            newMap[i].slice(j + 1);
          i += di;
          j += dj;
        }
      } else if (mov === "v") {
        const stack: [number, number][] = [
          [i + 1, j],
          [i + 1, j + (newMap[i + 1][j] === "[" ? 1 : -1)],
        ];
        let replaces: {
          i: number;
          j: number;
          char: string;
        }[] = [
          {
            i: i + 1,
            j,
            char: "@",
          },
          {
            i: i + 1,
            j: newMap[i + 1][j] === "[" ? j + 1 : j - 1,
            char: ".",
          },
          {
            i,
            j,
            char: ".",
          },
        ];
        while (stack.length > 0) {
          const [ci, cj] = stack.shift();
          if (newMap[ci + 1][cj] === "#") {
            replaces = [];
            break;
          }
          if (["[", "]", "."].includes(newMap[ci + 1][cj])) {
            if (["[", "]"].includes(newMap[ci + 1][cj])) {
              stack.push(
                [ci + 1, cj],
                [ci + 1, cj + (newMap[ci + 1][cj] === "[" ? 1 : -1)]
              );
            }
            replaces.unshift(
              ...[
                { i: ci + 1, j: cj, char: newMap[ci][cj] },
                {
                  i: ci + 1,
                  j: cj + (newMap[ci][cj] === "[" ? 1 : -1),
                  char: newMap[ci][cj] === "[" ? "]" : "[",
                },
                { i: ci, j: cj, char: "." },
                { i: ci, j: cj + (newMap[ci][cj] === "[" ? 1 : -1), char: "." },
              ]
            );
          }
        }
        for (const { i, j, char } of replaces) {
          newMap[i] = replaceAt(newMap[i], j, char);
        }
        if (replaces.length > 0) {
          i += di;
          j += dj;
        }
      } else {
        const stack: [number, number][] = [
          [i - 1, j],
          [i - 1, j + (newMap[i - 1][j] === "[" ? 1 : -1)],
        ];
        let replaces: {
          i: number;
          j: number;
          char: string;
        }[] = [
          {
            i: i - 1,
            j,
            char: "@",
          },
          {
            i: i - 1,
            j: newMap[i - 1][j] === "[" ? j + 1 : j - 1,
            char: ".",
          },
          {
            i,
            j,
            char: ".",
          },
        ];
        while (stack.length > 0) {
          const [ci, cj] = stack.shift();
          if (newMap[ci - 1][cj] === "#") {
            replaces = [];
            break;
          }
          if (["[", "]", "."].includes(newMap[ci - 1][cj])) {
            if (["[", "]"].includes(newMap[ci - 1][cj])) {
              stack.push(
                [ci - 1, cj],
                [ci - 1, cj + (newMap[ci - 1][cj] === "[" ? 1 : -1)]
              );
            }
            replaces.unshift(
              ...[
                { i: ci - 1, j: cj, char: newMap[ci][cj] },
                {
                  i: ci - 1,
                  j: cj + (newMap[ci][cj] === "[" ? 1 : -1),
                  char: newMap[ci][cj] === "[" ? "]" : "[",
                },
                { i: ci, j: cj, char: "." },
                { i: ci, j: cj + (newMap[ci][cj] === "[" ? 1 : -1), char: "." },
              ]
            );
          }
        }
        for (const { i, j, char } of replaces) {
          newMap[i] = replaceAt(newMap[i], j, char);
        }
        if (replaces.length > 0) {
          i += di;
          j += dj;
        }
      }
    }
  }
  return newMap.reduce(
    (sum, row, i) =>
      sum +
      row
        .split("")
        .reduce((prev, curr, j) => prev + (curr === "[" ? 100 * i + j : 0), 0),
    0
  );
};
