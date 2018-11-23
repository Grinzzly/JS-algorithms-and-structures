class Queue {
  constructor(value) {
    this.data = [];
    this.enqueue(value);
  }

  enqueue(value) {
    this.data.unshift(value);

    return this;
  }

  dequeue() {
    return this.data.pop();
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

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
console.log('The wWhole Queue: ', queue);
console.log('Size of the Queue: ', queue.getSize());
