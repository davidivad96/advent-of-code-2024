import { Input } from ".";
import { Direction, replaceAt } from "./utils";

const isCycle = (
  map: string[],
  start: [number, number],
  obstacle: [number, number]
) => {
  const mapCopy = [...map];
  mapCopy[obstacle[0]] = replaceAt(map[obstacle[0]], obstacle[1], "#");
  let [i, j] = start;
  let currentDirection: Direction = "up";
  const visited: [number, number, Direction][] = [];
  while (true) {
    if (currentDirection === "up") {
      if (i === 0) {
        return false;
      } else if (mapCopy[i - 1][j] === "#") {
        if (
          visited.find(
            (corner) => corner[0] === i && corner[1] === j && corner[2] === "up"
          )
        ) {
          return true;
        }
        visited.push([i, j, "up"]);
        currentDirection = "right";
      } else {
        i--;
      }
    } else if (currentDirection === "right") {
      if (j === mapCopy[i].length - 1) {
        return false;
      } else if (mapCopy[i][j + 1] === "#") {
        if (
          visited.find(
            (corner) =>
              corner[0] === i && corner[1] === j && corner[2] === "right"
          )
        ) {
          return true;
        }
        visited.push([i, j, "right"]);
        currentDirection = "down";
      } else {
        j++;
      }
    } else if (currentDirection === "down") {
      if (i === mapCopy.length - 1) {
        return false;
      } else if (mapCopy[i + 1][j] === "#") {
        if (
          visited.find(
            (corner) =>
              corner[0] === i && corner[1] === j && corner[2] === "down"
          )
        ) {
          return true;
        }
        visited.push([i, j, "down"]);
        currentDirection = "left";
      } else {
        i++;
      }
    } else if (currentDirection === "left") {
      if (j === 0) {
        return false;
      } else if (mapCopy[i][j - 1] === "#") {
        if (
          visited.find(
            (corner) =>
              corner[0] === i && corner[1] === j && corner[2] === "left"
          )
        ) {
          return true;
        }
        visited.push([i, j, "left"]);
        currentDirection = "up";
      } else {
        j--;
      }
    }
  }
};

export const partTwo = ({ map, start }: Input) => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ".") {
        const obstacle: [number, number] = [i, j];
        sum += isCycle(map, start, obstacle) ? 1 : 0;
      }
    }
  }
  return sum;
};
