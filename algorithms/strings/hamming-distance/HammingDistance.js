const hammingDistance = (a, b) => {
  if (a.length !== b.length) {
    throw new Error('Strings must be of equal length');
  }

  let distance = 0;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      distance += 1;
    }
  }

  return distance;
};
