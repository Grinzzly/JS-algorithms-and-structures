const traversal = (linkedList, callback) => {
  let currentNode = linkedList.head;

  while (currentNode) {
    callback(currentNode.value);
    currentNode = currentNode.next;
  }
};

/* Everything bellow this line for demo purposes only */

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
}

const linkedList = new LinkedList(0);

linkedList
  .addToHead(1)
  .addToHead(2)
  .addToHead(3);

const traversedNodeValues = [];
const traversalCallback = (nodeValue) => {
  traversedNodeValues.push(nodeValue);
};

traversal(linkedList, traversalCallback);

console.log('Straight traversal results:', traversedNodeValues);
