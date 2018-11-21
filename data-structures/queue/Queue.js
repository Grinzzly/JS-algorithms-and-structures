class Queue {
  constructor(value) {
    this.data = [];
    this.add(value);
  }

  add(value) {
    this.data.unshift(value);
  }

  remove() {
    this.data.pop();
  }

  getFirst() {
    return this.data[0];
  }

  getLast() {
    return this.data[this.data.length - 1];
  }

  getSize() {
    return this.data.length;
  }
}

const queue = new Queue();

queue.add(1);
queue.add(2);
queue.add(3);
queue.remove();
console.log('The wWhole Queue: ', queue);
console.log('Size of the Queue: ', queue.getSize());
