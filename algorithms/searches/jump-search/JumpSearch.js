const jumpSearch = (list, target) => {
  const length = list.length;
  let step = Math.floor(Math.sqrt(length));
  let lowerBound = 0;

  while (list[Math.min(step, length) - 1] < target) {
    lowerBound = step;
    step += step;

    if (lowerBound >= length){
      return -1;
    }
  }

  let upperBound = Math.min(step, length);

  while (list[lowerBound] < target) {
    lowerBound++;

    if (lowerBound === upperBound){
      return -1;
    }
  }
  if (list[lowerBound] === target){
    return lowerBound;
  }

  return -1;
};

const arrayToSearch = [2, 6, 8, 12, 43, 78, 99, 134, 144, 156, 199, 256, 500];
console.log('In target list 256 founded at position :', jumpSearch(arrayToSearch, 256));
