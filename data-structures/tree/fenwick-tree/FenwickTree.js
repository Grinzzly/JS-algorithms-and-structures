class BinaryIndexedTree {
  constructor(arg) {
    if (typeof arg === 'number') {
      this.sumTree = new Array(arg).fill(0);

      return this;
    } else if (arg instanceof Array) {
      this.sumTree = arg.slice();

      this.sumTree.forEach((value, i) => {
        /* For each consecutive 1 in the lowest order bits of i */
        for (let j = 1; (i & j) !== 0; j <<= 1) {
          value += this.sumTree[i ^ j];
        }

        this.sumTree[i] = value;

        return this;
      });
    } else {
      throw "Illegal argument";
    }
  }

  get(index) {
    if (!(0 <= index && index < this.sumTree.length)) {
      throw "Index out of bounds";
    }

    let element = this.sumTree[index];

    /* For each consecutive 1 in the lowest order bits of index */
    for (let i = 1; (index & i) !== 0; i <<= 1) {
      element -= this.sumTree[index ^ i];
    }

    return element;
  };

  set(index, val) {
    if (!(0 <= index && index < this.sumTree.length)) {
      throw "Index out of bounds";
    }

    this.add(index, val - this.get(index));

    return this;
  };

  add(index, delta) {
    if (!(0 <= index && index < this.sumTree.length)) {
      throw "Index out of bounds";
    }

    do {
      this.sumTree[index] += delta;

      /* Set lowest 0 bit; strictly increasing */
      index |= index + 1;
    } while (index < this.sumTree.length);

    return this;
  };

  getTotal() {
    return this.getPrefixSum(this.sumTree.length);
  };


  getPrefixSum(end) {
    if (!(0 <= end && end <= this.sumTree.length)) {
      throw "Index out of bounds";
    }

    let prefixSum = 0;
    while (end > 0) {
      prefixSum += this.sumTree[end - 1];

      /* Clear lowest 1 bit; strictly decreasing */
      end &= end - 1;
    }

    return prefixSum;
  };

  getRangeSum(start, end) {
    if (!(0 <= start && start <= end && end <= this.sumTree.length)) {
      throw "Index out of bounds";
    }

    return this.getPrefixSum(end) - this.getPrefixSum(start);
  };
}

const fenTree = new BinaryIndexedTree(5);
console.log('Add element at 0 position with index 3: ', fenTree.add(0, 3));
console.log('Get 0 index: ', fenTree.get(0));
console.log('Set 5 on 3rd index: ', fenTree.set(3, 5));
console.log('Get total summ: ', fenTree.getTotal());
console.log('Get range summ from 1st till the 4th indexes: ', fenTree.getRangeSum(1, 4));
