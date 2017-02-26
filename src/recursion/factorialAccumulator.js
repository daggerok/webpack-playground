export const factorialAccumulator = (n, acc = 1) => {
  if (n < 2) return acc;
  return factorialAccumulator(n - 1, n * acc);
};
