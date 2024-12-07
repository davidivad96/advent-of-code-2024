import { Input } from ".";
import { Direction, replaceAt } from "./utils";

export const partOne = ({ map, start }: Input) => {
  const mapCopy = [...map];
  let [i, j] = start;
  let currentDirection: Direction = "up";
  while (true) {
    mapCopy[i] = replaceAt(mapCopy[i], j, "X");
    if (currentDirection === "up") {
      if (i === 0) {
        break;
      } else if (mapCopy[i - 1][j] === "#") {
        currentDirection = "right";
      } else {
        i--;
      }
    } else if (currentDirection === "right") {
      if (j === mapCopy[i].length - 1) {
        break;
      } else if (mapCopy[i][j + 1] === "#") {
        currentDirection = "down";
      } else {
        j++;
      }
    } else if (currentDirection === "down") {
      if (i === mapCopy.length - 1) {
        break;
      } else if (mapCopy[i + 1][j] === "#") {
        currentDirection = "left";
      } else {
        i++;
      }
    } else if (currentDirection === "left") {
      if (j === 0) {
        break;
      } else if (mapCopy[i][j - 1] === "#") {
        currentDirection = "up";
      } else {
        j--;
      }
    }
  }
  return mapCopy.reduce(
    (prev, curr) => prev + (curr.match(/X/g)?.length || 0),
    0
  );
};
