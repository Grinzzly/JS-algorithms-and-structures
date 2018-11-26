const euclideanAlgorithm = (originalA, originalB) => {
  /* Make input numbers positive. */
  const a = Math.abs(originalA);
  const b = Math.abs(originalB);

  /**
   * To make algorithm work faster instead of subtracting one number from the other
   * we may use modulo operation.
   */
  return (b === 0) ? a : euclideanAlgorithm(b, a % b);
};

const euclideanAlgorithmIterative = (originalA, originalB) => {
  let a = Math.abs(originalA);
  let b = Math.abs(originalB);

  /**
   * Subtract one number from another until both numbers would become the same.
   * This will be out GCD. Also quit the loop if one of the numbers is zero.
   */
  while (a && b && a !== b) {
    [a, b] = a > b ? [a - b, b] : [a, b - a];
  }

  /* Return the number that is not equal to zero since the last subtraction (it will be a GCD). */
  return a || b;
};

console.log(
  'GCD for 105 and 252 by Euclidean Recursive Algorithm: ',
  euclideanAlgorithm(105, 252),
);
console.log(
  'GCD for 462 and 1071 by Euclidean Iterative Algorithm: ',
  euclideanAlgorithmIterative(462, 1071),
);
