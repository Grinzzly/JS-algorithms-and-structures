const heapSort = (items) => {
  let l = items.length;

  for (let i = Math.floor(l / 2); i >= 0; i--)      {
    heap_root(items, i);
  }

  for (let i = items.length - 1; i > 0; i--) {
    swap(items, 0, i);
    l--;
    heap_root(items, 0);
  }

  function heap_root(heap, i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < l && heap[left] > heap[max]) {
      max = left;
    }

    if (right < l && heap[right] > heap[max])     {
      max = right;
    }

    if (max !== i) {
      swap(heap, i, max);
      heap_root(heap, max);
    }
  }

  function swap(data, firstIndex, secondIndex) {
    const tmp = data[firstIndex];

    data[firstIndex] = data[secondIndex];
    data[secondIndex] = tmp;
  }

  return items;
};

const list = [3, 5, 7, 4, 1, 2, 8];
console.log(`${list} sorted through heap sort is ${heapSort(list)}`);
