const COLORS = {
  RED: 0,
  BLACK: 1
};

class Node {
  constructor(key, value, left, right, color) {
    this.key = key;
    this.left = left;
    this.right = right;
    this.value = value;
    this.color = color;
  }

  isRed() {
    return this.color === COLORS.RED;
  };

  flipColor() {
    if (this.color === COLORS.RED) {
      this.color = COLORS.BLACK;
    } else {
      this.color = COLORS.RED;
    }
  }
}

class RBTree {
  constructor() {
    this.root = null;
  }

  add(key, value) {
    this.root = this.addNode(key, value, this.root);
    this.root.color = COLORS.BLACK;
  };

  addNode(key, value, node) {
    let newRoot = node;

    if (node === null) {
      return new Node(key, value, null, null, COLORS.RED);
    }
    if (node.key > key) {
      node.left = this.addNode(key, value, node.left);
    } else if (node.key < key) {
      node.right = this.addNode(key, value, node.right);
    } else {
      node.value = value;
    }

    if (node.right.isRed() && !node.left.isRed()) {
      newRoot = this.rotateLeft(node);
    }

    if (node.left.isRed() && node.left.left.isRed()) {
      newRoot = this.rotateRight(node);
    }

    if (node.left.isRed() && node.right.isRed()) {
      node.left.flipColor();
      node.right.flipColor();
    }

    return newRoot;
  };

  rotateLeft(node) {
    const rightNode = node.right;

    if (rightNode !== null) {
      node.right = rightNode.right;
      rightNode.left = node;
      rightNode.color = node.color;
      node.color = COLORS.RED;
    }

    return rightNode;
  };

  rotateRight(node) {
    const leftNode = node.left;

    if (leftNode !== null) {
      node.left = leftNode.right;
      leftNode.right = node;
      leftNode.color = node.color;
      node.color = COLORS.RED;
    }

    return leftNode;
  };

  get(key) {
    return this.getNode(this._root, key);
  };

  getNode(node, key) {
    if (node === null) {
      return undefined;
    } else if (node.key === key) {
      return node.value;
    } else if (node.key > key) {
      return this.getNode(node.left, key);
    }

    return this.getNode(node.right, key);
  };

  levelOrderTraversal() {
    const queue = [];
    const traversalResults = [];

    if (this.root){
      queue.push(this.root);
    }

    while (queue.length !== 0){
      const tempNode = queue.shift();

      traversalResults.push(tempNode.key);

      if (tempNode.left !== null){
        queue.push(tempNode.left);
      }

      if (tempNode.right !== null){
        queue.push(tempNode.right);
      }
    }

    const status = traversalResults.length ?
      traversalResults.join(', ') :
      'tree is empty';

    return (`Level Order Traversal: ${status}`);
  };
}
