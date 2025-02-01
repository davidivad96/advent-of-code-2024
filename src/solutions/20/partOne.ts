import { Input } from ".";

type Direction = "up" | "right" | "down" | "left";

const directions: Record<Direction, [number, number]> = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

const calculateSavePicoseconds = (
  racetrack: string[],
  [si, sj]: [number, number],
  [ei, ej]: [number, number],
  [ci, cj]: [number, number]
) => {
  let [i, j] = [si, sj];
  let dir: Direction =
    racetrack[i][j + 1] === "."
      ? "right"
      : racetrack[i][j - 1] === "."
      ? "left"
      : racetrack[i - 1]?.[j] === "."
      ? "up"
      : "down";
  let [pi, pj] = [-1, -1];
  let counter = 0;
  while ((i !== pi || j !== pj) && (i !== ei || j !== ej)) {
    if (pi === -1 && pj === -1) {
      if (i + 1 === ci && j === cj) {
        pi = i + 2;
        pj = j;
      } else if (i === ci && j + 1 === cj) {
        pi = i;
        pj = j + 2;
      } else if (i - 1 === ci && j === cj) {
        pi = i - 2;
        pj = j;
      } else if (i === ci && j - 1 === cj) {
        pi = i;
        pj = j - 2;
      }
    } else if (racetrack[pi][pj] === "#") return 0;
    let ni = directions[dir][0];
    let nj = directions[dir][1];
    if (racetrack[i + ni][j + nj] === "#") {
      if (["up", "down"].includes(dir)) {
        dir = racetrack[i][j + 1] === "." ? "right" : "left";
      } else {
        dir = racetrack[i - 1]?.[j] === "." ? "up" : "down";
      }
      ni = directions[dir][0];
      nj = directions[dir][1];
    }
    i += ni;
    j += nj;
    if (pi !== -1 && pj !== -1) {
      counter++;
    }
  }
  return counter - 2;
};

export const partOne = ({ racetrack, start, end }: Input) => {
  let counter = 0;
  for (let i = 1; i < racetrack.length - 1; i++) {
    for (let j = 1; j < racetrack[0].length - 1; j++) {
      if (calculateSavePicoseconds(racetrack, start, end, [i, j]) >= 100) {
        counter++;
      }
    }
  }
  return counter;
};
