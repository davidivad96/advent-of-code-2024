const calculate = (n: bigint): [Record<string, number>, string[]] => {
  const mod = 16777216n;
  let current = n;
  const prices: number[] = [Number(current % 10n)];
  for (let i = 0; i < 2000; i++) {
    current = ((current * 64n) ^ current) % mod;
    current = ((current / 32n) ^ current) % mod;
    current = ((current * 2048n) ^ current) % mod;
    prices.push(Number(current % 10n));
  }
  const sequenceToPrice: Record<string, number> = {};
  const sequences: string[] = [];
  for (let i = 1; i < prices.length - 3; i++) {
    const sequence = prices
      .slice(i, i + 4)
      .reduce((prev, curr, j) => [...prev, curr - prices[i + j - 1]], []);
    const key = sequence.join(",");
    sequenceToPrice[key] = sequenceToPrice[key] ?? prices[i + 3];
    sequences.push(key);
  }
  return [sequenceToPrice, sequences];
};

export const partTwo = (input: bigint[]) => {
  const [monster, allSequences] = input.reduce(
    (prev, curr) => {
      const [sequenceToPrice, sequences] = calculate(curr);
      return [
        { ...prev[0], [Number(curr)]: sequenceToPrice },
        new Set([...prev[1], ...sequences]),
      ];
    },
    [{}, new Set()] as [Record<string, Record<string, number>>, Set<string>]
  );
  return [...allSequences].reduce(
    (prev, curr) =>
      Math.max(
        prev,
        Object.keys(monster).reduce(
          (sum, buyer) => sum + (monster[buyer][curr] ?? 0),
          0
        )
      ),
    0
  );
};
