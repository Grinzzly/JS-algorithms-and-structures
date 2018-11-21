class LinkedList {
  constructor(value) {
    this.head = null;
    this.length = 0;
    this.addToHead(value);
  }

  addToHead(value) {
    const newNode = { value };

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  removeFromHead() {
    if (!this.length) {
      return undefined;
    }

    const value = this.head.value;

    this.head = this.head.next;
    this.length--;

    return value;
  }

  find(value) {
    let thisNode = this.head;

    while(thisNode) {
      if(thisNode.value === value) {
        return thisNode;
      }

      thisNode = thisNode.next;
    }

    return thisNode;
  }

  remove(value) {
    if (!this.length) {
      return undefined;
    }

    if (this.head.value === value) {
      return this.removeFromHead();
    }

    let previousNode = this.head;
    let thisNode = previousNode.next;

    while(thisNode) {
      if(thisNode.value === value) {
        break;
      }

      previousNode = thisNode;
      thisNode = thisNode.next;
    }

    if (thisNode === null) {
      return undefined;
    }

    previousNode.next = thisNode.next;
    this.length--;

    return this;
  }
}

const list = new LinkedList(3);

list.addToHead(2);
list.addToHead(1);
console.log('Whole list: ', list);
console.log('Trying to find 1: ', list.find(1));
list.remove(2);
console.log('Whole list after removing 2: ', list);
