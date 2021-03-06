const SEPARATOR = '$';

function zBuilder(zString) {
  const zArray = new Array(zString.length).fill(0);
  let zBoxLeftIndex = 0;
  let zBoxRightIndex = 0;

  /**
   * Position of current zBox character that is also a position of
   * the same character in prefix.
   * For example:
   * Z string: ab$xxabxx
   * Indices:  012345678
   * Prefix:   ab.......
   * Z box:    .....ab..
   * Z box shift for 'a' would be 0 (0-position in prefix and 0-position in Z box)
   * Z box shift for 'b' would be 1 (1-position in prefix and 1-position in Z box)
   */
  let zBoxShift = 0;

  for (let charIndex = 1; charIndex < zString.length; charIndex += 1) {
    if (charIndex > zBoxRightIndex) {
      /**
       * We're OUTSIDE of Z box. In other words this is a case when we're
       * starting from Z box of size 1.
       */

      /* In this case let's make current character to be a Z box of length 1. */
      zBoxLeftIndex = charIndex;
      zBoxRightIndex = charIndex;

      /**
       * Now let's go and check current and the following characters to see if
       * they are the same as a prefix. By doing this we will also expand our
       * Z box. For example if starting from current position we will find 3
       * more characters that are equal to the ones in the prefix we will expand
       * right Z box boundary by 3.
       */
      while (
        zBoxRightIndex < zString.length
        && zString[zBoxRightIndex - zBoxLeftIndex] === zString[zBoxRightIndex]
      ) {
        /* Expanding Z box right boundary. */
        zBoxRightIndex += 1;
      }

      /**
       * Now we may calculate how many characters starting from current position
       * are the same as the prefix. We may calculate it by difference between
       * right and left Z box boundaries.
       */
      zArray[charIndex] = zBoxRightIndex - zBoxLeftIndex;

      zBoxRightIndex -= 1;
    } else {
      /* INSIDE of Z box. */
      zBoxShift = charIndex - zBoxLeftIndex;

      if (zArray[zBoxShift] < (zBoxRightIndex - charIndex) + 1) {
        zArray[charIndex] = zArray[zBoxShift];
      } else {
        /**
         * In case if previously calculated values forces us to go outside of Z box
         * we can't safely copy previously calculated zArray value. It is because
         * there is no prefix matches outside of Z box.
         */
        zBoxLeftIndex = charIndex;

        while (
          zBoxRightIndex < zString.length
          && zString[zBoxRightIndex - zBoxLeftIndex] === zString[zBoxRightIndex]
          ) {
          zBoxRightIndex += 1;
        }

        zArray[charIndex] = zBoxRightIndex - zBoxLeftIndex;

        zBoxRightIndex -= 1;
      }
    }
  }

  return zArray;
}

const zAlgorithm = (text, word) => {
  const wordPositions = [];

  /* Concatenate word and string. Word will be a prefix to a string. */
  const zString = `${word}${SEPARATOR}${text}`;

  /* Generate Z-array for concatenated string. */
  const zArray = zBuilder(zString);

  for (let charIndex = 1; charIndex < zArray.length; charIndex += 1) {
    if (zArray[charIndex] === word.length) {
      /**
       * Since we did concatenation to form zString we need to subtract prefix
       * and separator lengths.
       */
      const wordPosition = charIndex - word.length - SEPARATOR.length;

      wordPositions.push(wordPosition);
    }
  }

  return wordPositions;
};

console.log(
  'Positions for "lets" word in "hey ho lets go lets do it" string are',
  zAlgorithm('hey ho lets go lets do it', 'lets').join(', '),
);
