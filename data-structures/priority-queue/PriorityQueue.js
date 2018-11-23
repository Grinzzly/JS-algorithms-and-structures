const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor() {
    this.heap = [];
    this.comparator = (a, b) => a > b;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[top];
  }

  push(...values) {
    values.forEach(value => {
      this.heap.push(value);
      this.siftUp();
    });

    return this.size();
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;

    if (bottom > top) {
      this.swap(top, bottom);
    }

    this.heap.pop();
    this.siftDown();

    return poppedValue;
  }

  replace(value) {
    const replacedValue = this.peek();

    this.heap[top] = value;
    this.siftDown();

    return replacedValue;
  }

  greater(i, j) {
    return this.comparator(this.heap[i], this.heap[j]);
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  siftUp() {
    let node = this.size() - 1;

    while (node > top && this.greater(node, parent(node))) {
      this.swap(node, parent(node));
      node = parent(node);
    }
  }

  siftDown() {
    let node = top;

    while (
      (left(node) < this.size() && this.greater(left(node), node)) ||
      (right(node) < this.size() && this.greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this.greater(right(node), left(node))) ? right(node) : left(node);
      this.swap(node, maxChild);

      node = maxChild;
    }
  }
}

const queue = new PriorityQueue();

queue.push(10, 20, 30, 40, 50);
console.log('Top: ', queue.peek()); // 50
console.log('Size: ', queue.size()); // 5
console.log('Contents:');

while (!queue.isEmpty()) {
  console.log(queue.pop()); // 40, 30, 20, 10
}