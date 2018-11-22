const quickSort = (items) => {
  if (items.length <= 1) {
    return items;
  }

  const l = items.length;
  const pivot = items.pop();
  const left = [];
  const right = [];

  for (let i = 0; i < l; i++) {
    if (items[i] <= pivot) {
      left.push(items[i]);
    } else {
      right.push(items[i]);
    }
  }

  return [].concat(quickSort(left), pivot, quickSort(right));
};

const list = [2, 5, 1, 3, 7, 2, 3, 8, 6, 3];
console.log(`${list} sorted through quick sort is ${quickSort(list)}`);
