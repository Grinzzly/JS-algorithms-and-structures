const fibNthRec = (n) => {
  return n <= 1 ? n : fibNthRec(n-1) + fibNthRec(n-2);
};

const fibNth = (n) => {
  if (n < 1) {
    return null;
  }

  let currentValue = 1;
  let previousValue = 0;

  for (let i = 2; i <= n; i++) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;
  }

  return currentValue;
};

const fibRec = (n) => {
  if (n === 1) {
    return [ 1 ];
  } else {
    const sequence = fibRec(n - 1);
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);

    return sequence;
  }
};

const fib = (n) => {
  if (n < 1) {
    return null;
  }

  const sequence = [ 1 ];
  let currentValue = 1;
  let previousValue = 0;

  for (let i = 2; i <= n; i++) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    sequence.push(currentValue);
  }

  return sequence.join(', ');
};

console.log('Fibonacci sequence for 7: ', fib(7));
console.log('Fibonacci sequence rec for 13: ', fibRec(13));
console.log('Fibonacci sequence 9th member: ', fibNth(9));
console.log('Fibonacci sequence 77th member rec: ', fibNthRec(77));
