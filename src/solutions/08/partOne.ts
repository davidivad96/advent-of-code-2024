export const partOne = (input: string[]) => {
  const antennas: Record<string, [number, number][]> = {};
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== ".") {
        antennas[input[i][j]] = [...(antennas[input[i][j]] ?? []), [i, j]];
      }
    }
  }
  let sum = 0;
  const seen: Set<string> = new Set();
  const toKey = (x: number, y: number) => `${x},${y}`;
  for (const key of Object.keys(antennas)) {
    const frequency = antennas[key];
    for (let i = 0; i < frequency.length; i++) {
      for (let j = i + 1; j < frequency.length; j++) {
        const [i1, j1] = frequency[i];
        const [i2, j2] = frequency[j];
        const [di, dj] = [i1 - i2, j1 - j2];
        const key1 = toKey(i1 + di, j1 + dj);
        const key2 = toKey(i2 - di, j2 - dj);
        if (
          i1 + di >= 0 &&
          i1 + di < input.length &&
          j1 + dj >= 0 &&
          j1 + dj < input[0].length &&
          !seen.has(key1)
        ) {
          sum++;
          seen.add(key1);
        }
        if (
          i2 - di > 0 &&
          i2 - di < input.length &&
          j2 - dj >= 0 &&
          j2 - dj < input[0].length &&
          !seen.has(key2)
        ) {
          sum++;
          seen.add(key2);
        }
      }
    }
  }
  return sum;
};
