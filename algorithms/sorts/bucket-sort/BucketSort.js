const bucketSort = (items, bucketSize = 5) => {
  if (items.length === 0) {
    return items;
  }

  let minValue = items[0];
  let maxValue = items[0];

  /* Determine minimum and maximum values */
  for (let i = 1; i < items.length; i++) {
    if (items[i] < minValue) {
      minValue = items[i];
    } else if (items[i] > maxValue) {
      maxValue = items[i];
    }
  }

  /* Initialise buckets */
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new items(bucketCount);

  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  /* Distribute input items values into buckets */
  for (let i = 0; i < items.length; i++) {
    buckets[Math.floor((items[i] - minValue) / bucketSize)].push(items[i]);
  }

  /* Sort buckets and place back into input items */
  items.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    /*  TODO: you need to implement main sorting function */
    insertionSort(buckets[i]);

    for (let j = 0; j < buckets[i].length; j++) {
      items.push(buckets[i][j]);
    }
  }

  return items;
};

const list = [3, 5, 7, 4, 1, 2, 8];
console.log(`${list} sorted through bucket(with insertion) sort it is ${bucketSort(list)}`);
