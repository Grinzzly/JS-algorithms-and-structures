const selectionSort = (items) => {
  const l = items.length;

  for (let i = 0; i < l; i++) {
    let min = i;

    for (let j = i + 1; j < l; j++) {
      if (items[j] < items[min]){
        min = j;
      }
    }
    if (i !== min){
      const tmp = items[i];

      items[i] = items[min];
      items[min] = tmp;
    }
  }

  return items;
};

const a = [3, 5, 7, 4, 1, 2, 8];
console.log(`${a} sorted through selection sort it is ${selectionSort(a)}`);
