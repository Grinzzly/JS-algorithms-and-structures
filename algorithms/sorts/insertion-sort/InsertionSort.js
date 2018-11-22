const insertionSort = (items) => {
  const l = items.length;
  let j = 0;

  for (let i = 0; i < l; i++) {
    const current = items[i];

    for (j = i - 1; j >= 0 && items[j] > current; j--) {
      items[j + 1] = items[j];
    }

    items[j + 1] = current;
  }

  return items;
};

const list = [3, 5, 7, 4, 1, 2, 8];
console.log(`${list} sorted through insertion sort it is ${insertionSort(list)}`);
