const calculateScore = (map: string[], initial: [number, number]): number => {
  let score = 0;
  const directions: [number, number][] = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];
  const queue: [number, number][] = [initial];
  const visited = new Set<string>();

  const toKey = (x: number, y: number) => `${x},${y}`;

  while (queue.length) {
    const [i, j] = queue.shift();
    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;
      if (+map[ni]?.[nj] - +map[i][j] === 1) {
        const key = toKey(ni, nj);
        if (!visited.has(key)) {
          visited.add(key);
          if (map[ni][nj] === "9") {
            score++;
          } else {
            queue.push([ni, nj]);
          }
        }
      }
    }
  }

  return score;
};

export const partOne = (input: string[]): number => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "0") {
        sum += calculateScore(input, [i, j]);
      }
    }
  }
  return sum;
};