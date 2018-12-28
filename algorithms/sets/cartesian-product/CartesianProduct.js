const cartesianProduct = (setA, setB) => {
  if (!setA || !setB || !setA.length || !setB.length) {
    return null;
  }

  const product = [];

  for (let indexA = 0; indexA < setA.length; indexA += 1) {
    for (let indexB = 0; indexB < setB.length; indexB += 1) {
      product.push([setA[indexA], setB[indexB]]);
    }
  }

  return product;
};

console.log(
  'Product set for [x, y, z] and [1, 2, 3] is',
  cartesianProduct(['x', 'y', 'z'], [1, 2, 3]),
);
