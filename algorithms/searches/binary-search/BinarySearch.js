const binarySearch = (list, target) => {
  let start = 0;
  let stop = list.length - 1;
  let middle = Math.floor((start + stop) / 2);

  /* While the middle is not what we're looking for and the list does not have a single item */
  while (list[middle] !== target && start < stop) {
    if (target < list[middle]) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    /* Recalculate middle on every iteration */
    middle = Math.floor((start + stop) / 2);
  }

  /* if the current middle item is what we're looking for return it's index, else return -1 */
  return (list[middle] !== target) ? -1 : middle
};

const list = [2, 5, 8, 9, 13, 45, 67, 99];
console.log('Find index of 99 element by binary search: ', binarySearch(list, 99));
