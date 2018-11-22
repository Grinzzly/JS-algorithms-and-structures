class SegmentTree {
  constructor(inputArray, operation = Math.min, operationFallback = Infinity) {
    this.inputArray = inputArray;
    this.operation = operation;
    this.operationFallback = operationFallback;

    this.segmentTree = this.initSegmentTree(this.inputArray);
    this.buildSegmentTree();
  }

  initSegmentTree(inputArray) {
    let segmentTreeLen;
    const len = inputArray.length;
    const currentPower = Math.floor(Math.log2(len));
    const nextPower = currentPower + 1;
    const nextPowerOfTwoNumber = 2 ** nextPower;
    segmentTreeLen = (2 * nextPowerOfTwoNumber) - 1;

    return new Array(segmentTreeLen).fill(null);
  }

  buildSegmentTree() {
    const leftIndex = 0;
    const rightIndex = this.inputArray.length - 1;
    const position = 0;

    this.buildTreeRecursively(leftIndex, rightIndex, position);
  }

  buildTreeRecursively(leftInputIndex, rightInputIndex, position) {
    /**
     * If low input index and high input index are equal that would mean
     * the we have finished splitting and we are already came to the leaf
     * of the segment tree. We need to copy this leaf value from input
     * array to segment tree.
     */
    if (leftInputIndex === rightInputIndex) {
      this.segmentTree[position] = this.inputArray[leftInputIndex];

      return;
    }

    /* Split input array on two halves and process them recursively. */
    const middleIndex = Math.floor((leftInputIndex + rightInputIndex) / 2);
    /* Process left half of the input array. */
    this.buildTreeRecursively(leftInputIndex, middleIndex, this.getLeftChildIndex(position));
    /* Process right half of the input array. */
    this.buildTreeRecursively(middleIndex + 1, rightInputIndex, this.getRightChildIndex(position));

    /**
     * Once every tree leaf is not empty we're able to build tree bottom up using
     * provided operation function.
     */
    this.segmentTree[position] = this.operation(
      this.segmentTree[this.getLeftChildIndex(position)],
      this.segmentTree[this.getRightChildIndex(position)],
    );
  }

  rangeQuery(queryLeftIndex, queryRightIndex) {
    const leftIndex = 0;
    const rightIndex = this.inputArray.length - 1;
    const position = 0;

    return this.rangeQueryRecursive(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      rightIndex,
      position,
    );
  }

  rangeQueryRecursive(queryLeftIndex, queryRightIndex, leftIndex, rightIndex, position) {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      /* Total overlap. */
      return this.segmentTree[position];
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      /* No overlap. */
      return this.operationFallback;
    }

    /* Partial overlap. */
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    const leftOperationResult = this.rangeQueryRecursive(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      middleIndex,
      this.getLeftChildIndex(position),
    );

    const rightOperationResult = this.rangeQueryRecursive(
      queryLeftIndex,
      queryRightIndex,
      middleIndex + 1,
      rightIndex,
      this.getRightChildIndex(position),
    );

    return this.operation(leftOperationResult, rightOperationResult);
  }

  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }
}

const segmentTree = new SegmentTree([-1, 2], Math.min, Infinity);

console.log('Tree looks like: ', segmentTree.segmentTree);
console.log('Tree length: ', segmentTree.segmentTree.length);
