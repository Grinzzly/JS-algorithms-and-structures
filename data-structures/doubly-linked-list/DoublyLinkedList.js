class DoublyLinkedList{
  constructor(value) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.addToHead(value);
  }

  addToTail(value) {
    const newNode = {
      value,
      next: null,
      prev: null,
    };

    if (!this.head){
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }


  removeFromTail() {
    if (!this.head) {
      return undefined;
    }

    const prevNode = this.tail.prev;

    if (prevNode) {
      prevNode.next = null;
      this.tail = prevNode;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;

    return this;
  }


  addToHead(value) {
    const newNode = {
      value,
      next: null,
      prev: null,
    };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  removeFromHead() {
    if (!this.head) {
      return undefined;
    }

    const node = this.head.next;

    if (node) {
      node.prev = null;
      this.head = node;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;

    return this;
  }

  remove(value) {
    if (!this.length) {
      return undefined;
    }

    if (this.head.value === value) {
      return this.removeFromHead();
    }

    if (this.tail.value === value) {
      return this.removeFromTail();
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

  find(value) {
    let thisNode = this.head;

    while(thisNode) {
      if (thisNode.value === value) {
        return thisNode;
      }

      thisNode = thisNode.next;
    }

    return thisNode;
  }
}

const dlist = new DoublyLinkedList(2);

dlist.addToHead(0);
dlist.addToHead(1);
dlist.addToTail(3);
console.log('Whole list: ', dlist);
console.log('Trying to find 1: ', dlist.find(1));
dlist.removeFromHead();
console.log('Whole list after removing head value: ', dlist);
dlist.removeFromTail();
console.log('Whole list after removing tail value: ', dlist);
dlist.remove(2);
console.log('Whole list after removing 2: ', dlist);
