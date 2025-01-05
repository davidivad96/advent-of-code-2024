const calculate = (n: bigint) => {
  const mod = 16777216n;
  let current = n;
  for (let i = 0; i < 2000; i++) {
    current = ((current * 64n) ^ current) % mod;
    current = ((current / 32n) ^ current) % mod;
    current = ((current * 2048n) ^ current) % mod;
  }
  return current;
};

export const partOne = (input: bigint[]) =>
  input.reduce((sum, secret) => sum + calculate(secret), 0n);
