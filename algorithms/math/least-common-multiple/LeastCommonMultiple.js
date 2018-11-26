const leastCommonMultiple = (a, b) => {
  return ((a === 0) || (b === 0)) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
};

const euclideanAlgorithm = (originalA, originalB) => {
  /* Watch Euclidean Algorithm as an explanation reference */
  const a = Math.abs(originalA);
  const b = Math.abs(originalB);

  return (b === 0) ? a : euclideanAlgorithm(b, a % b);
};

console.log('LCM for 2 and 13: ', leastCommonMultiple(2, 13));
