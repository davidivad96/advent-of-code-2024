export const partTwo = (input: string[]) => {
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
        let i1aux = i1;
        let j1aux = j1;
        while (
          i1aux >= 0 &&
          i1aux < input.length &&
          j1aux >= 0 &&
          j1aux < input[0].length
        ) {
          const key1 = toKey(i1aux, j1aux);
          if (!seen.has(key1)) {
            sum++;
            seen.add(key1);
          }
          i1aux += di;
          j1aux += dj;
        }
        let i2aux = i2;
        let j2aux = j2;
        while (
          i2aux > 0 &&
          i2aux < input.length &&
          j2aux >= 0 &&
          j2aux < input[0].length
        ) {
          const key2 = toKey(i2aux, j2aux);
          if (!seen.has(key2)) {
            sum++;
            seen.add(key2);
          }
          i2aux -= di;
          j2aux -= dj;
        }
      }
    }
  }
  return sum;
};
