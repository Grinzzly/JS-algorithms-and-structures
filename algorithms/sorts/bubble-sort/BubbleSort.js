const bubbleSort = (items) => {
  const l = items.length;

  for (let i = 0; i < l; i++) {
    for (let j =0; j < l - i; j++) {
      if (items[j] > items[j+1]) {
        const tmp = items[j];

        items[j] = items[j + 1];
        items[j + 1] = tmp;
      }
    }
  }

  return items;
};

const list = [3, 5, 7, 4, 1, 2, 8];
console.log(`${list} sorted through bubble sort is ${bubbleSort(list)}`);
