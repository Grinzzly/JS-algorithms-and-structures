const fastPowering = (base, power) => {
  if (power === 0) {
    return 1;
  }

  if (power % 2 === 0) {
    /* If the power is even it may be recursively redefined as twice smaller powers */
    const multiplier = fastPowering(base, power / 2);

    return multiplier * multiplier;
  }

  /**
    * If the power is even it may be recursively redefined as twice smaller powers
    * and the sum with base raised to power of one
    */
  const multiplier = fastPowering(base, Math.floor(power / 2));

  return multiplier * multiplier * base;
};

console.log('5 raised to power of 20 is',fastPowering(5,40));
