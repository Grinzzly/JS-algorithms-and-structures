const reverseTraversalRecursive = (node, callback) => {
  if (node) {
    reverseTraversalRecursive(node.next, callback);
    callback(node.value);
  }
};

const reverseTraversal = (linkedList, callback) => {
  reverseTraversalRecursive(linkedList.head, callback);
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

reverseTraversal(linkedList, traversalCallback);

console.log('Reverse traversal results:', traversedNodeValues);
