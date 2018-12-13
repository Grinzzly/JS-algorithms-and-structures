const getPrimes = (n) => {
  const primaryMap = new Array(n).fill(true);
  const upperLimit = Math.sqrt(n);
  const primes = [];

  // Remove multiples of primes starting from 2, 3, 5,...
  for (let i = 2; i <= upperLimit; i++) {
    if (primaryMap[i]) {
      for (let j = i * i; j < n; j += i) {
        primaryMap[j] = false;
      }
    }
  }

  for (let i = 2; i < n; i++) {
    if(primaryMap[i]) {
      primes.push(i);
    }
  }

  return primes;
};

console.log('All primes from 0 to 20 is', getPrimes(20).join(', '));