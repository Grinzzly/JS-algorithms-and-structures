const countingSort = (list) => {
  const bucket = [];

  /* Assign each element to its bucket */
  for(let i in list) {
    bucket[list[i]] = bucket[list[i]] || 0;
    bucket[list[i]]++;
  }

  /* Now combine all the buckets */
  let idx = 0;

  for(let i in bucket){
    while(bucket[i] && bucket[i] > 0){
      /* Skip empty buckets and loop over every elements in a bucket */
      list[idx++] = i;
      bucket[i]--;
    }
  }

  return list;
};

const list = [3, 5, 7, 4, 1, 2, 8];
console.log(`${list} sorted through counting sort is ${countingSort(list)}`);
