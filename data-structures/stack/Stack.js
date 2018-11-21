class Stack {
  constructor(value) {
    this.data = [];
    this.add(value);
  }

  add(value) {
    this.data.push(value);
  }

  remove() {
    this.data.pop();
  }

  getFirst() {
    return this.data[this.data.length - 1];
  }

  getLast() {
    return this.data[0];
  }

  getSize() {
    return this.data.length;
  }
}

const stack = new Stack();

stack.add(1);
stack.add(2);
stack.add(3);
stack.remove();
console.log('The wWhole Queue: ', stack);
console.log('Size of the Queue: ', stack.getSize());
