const trialDivision = (number) => {
  if (number <= 1 || number % 2 === 0) {
    /* If number is less than one or divided by 2 then it isn't prime by definition. */
    return false;
  }

  if (number <= 3) {
    /* All numbers from 2 to 3 are prime. */
    return true;
  }

  /* If there is no dividers up to square root of n then there is no higher dividers as well. */
  const dividerLimit = Math.sqrt(number);

  for (let divider = 3; divider <= dividerLimit; divider += 2) {
    if (number % divider === 0) {
      return false;
    }
  }

  return true;
};

console.log('Is 8 prime?: ', trialDivision(8));
console.log('Is 11 prime?: ', trialDivision(11));
