const integerPartition = (number) => {
  const partitionMatrix = Array(number + 1).fill(null).map(() => {
    return Array(number + 1).fill(null);
  });

  /**
    * Let's fill the first row that represents how many ways we would have
    * to combine the numbers 1, 2, 3, ..., n with number 0. We would have zero
    * ways obviously since with zero number we may form only zero.
    */
  for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
    partitionMatrix[0][numberIndex] = 0;
  }

  /**
   * Let's fill the first column. It represents the number of ways we can form
   * number zero out of numbers 0, 0 and 1, 0 and 1 and 2, 0 and 1 and 2 and 3, ...
   * Obviously there is only one way we could form number 0
   * and it is with number 0 itself.
   */
  for (let summandIndex = 0; summandIndex <= number; summandIndex += 1) {
    partitionMatrix[summandIndex][0] = 1;
  }

  for (let summandIndex = 1; summandIndex <= number; summandIndex += 1) {
    for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
      if (summandIndex > numberIndex) {
        /**
          * If summand number is bigger then current number itself then just it won't add
          * any new ways of forming the number. Thus we may just copy the number from row above.
          */
        partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex];
      } else {
        /**
         * The number of combinations would equal to number of combinations of forming the same
         * number but without current summand number plus number of combinations of forming the
         * current number - current summand number but with current summand.
         */
        const combosWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex];
        const combosWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex];

        partitionMatrix[summandIndex][numberIndex] = combosWithoutSummand + combosWithSummand;
      }
    }
  }

  return partitionMatrix[number][number];
};

console.log('Integer Partition for 12 is', integerPartition(12));