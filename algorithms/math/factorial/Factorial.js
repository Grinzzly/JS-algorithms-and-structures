const factorialRec = (n) => {
  if (n <= 1) {
    return 1;
  }

  return n * factorialRec(n - 1);
};

const factorial = (n) => {
  let fact = 1;

  for(let i = 1; i <= n; i++) {
    fact *= i;
  }

  return fact;
};

console.log('Factorial 7 recursively: ', factorialRec(7));
console.log('Fibonacci for 5 non-recursively: ', factorial(5));

