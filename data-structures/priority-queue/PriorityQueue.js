class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    /* Creating object from queue element */
    const qElement = new QElement(element, priority);
    let contain = false;

    /**
     * Iterating through the entire
     * item array to add element at the
     * correct location of the Queue
     */
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority < qElement.priority) {
        /* Once the correct location is found it is enqueued */
        this.items.splice(i, 0, qElement);
        contain = true;

        break;
      }
    }

    /**
     * if the element have the highest priority
     * it is added at the end of the queue
     */
    if (!contain) {
      this.items.push(qElement);
    }

    return this;
  }

  dequeue() {
    if (this.isEmpty()) {
      return 'Queue is empty';
    }

    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return 'Queue is empty';
    }

    return this.items[0];
  }

  pok() {
    if (this.isEmpty()) {
      return 'Queue is empty';
    }

    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

const queue = new PriorityQueue();

queue
  .enqueue(10, 1)
  .enqueue(5, 2)
  .enqueue(3, 0);
console.log('Top: ', queue.peek()); // 3
console.log('Contents:');

while (!queue.isEmpty()) {
  console.log(queue.dequeue()); // 3, 10, 5
}
