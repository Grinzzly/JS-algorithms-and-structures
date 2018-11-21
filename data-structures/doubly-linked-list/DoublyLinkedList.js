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
      return null;
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
    }else{
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  removeFromHead() {
    if (!this.head) {
      return null;
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
