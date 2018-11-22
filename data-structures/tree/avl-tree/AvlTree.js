class AVLTree {
  constructor(n, attr) {
    this.attr = attr;
    this.left = null;
    this.right = null;
    this.node = n;
    this.depth = 1;
    this.elements = [n];
  }

  balance() {
    const ldepth = this.left === null ? 0 : this.left.depth;
    const rdepth = this.right === null ? 0 : this.right.depth;

    if (ldepth > rdepth + 1) {
      /* LR or LL rotation */
      const lldepth = this.left.left === null ? 0 : this.left.left.depth;
      const lrdepth = this.left.right === null ? 0 : this.left.right.depth;

      if (lldepth < lrdepth) {
        /* LR rotation consists of a RR rotation of the left child */
        this.left.rotateRR();
        /* plus a LL rotation of this node, which happens anyway */
      }
      this.rotateLL();
    } else if (ldepth + 1 < rdepth) {
      /* RR or RL rorarion */
      const rrdepth = this.right.right === null ? 0 : this.right.right.depth;
      const rldepth = this.right.left === null ? 0 : this.right.left.depth;

      if (rldepth > rrdepth) {
        /* RR rotation consists of a LL rotation of the right child */
        this.right.rotateLL();
        /* plus a RR rotation of this node, which happens anyway */
      }
      this.rotateRR();
    }
  };

  rotateLL() {
    /* the left side is too long => rotate from the left (NOT leftwards) */
    const nodeBefore = this.node;
    const elementsBefore = this.elements;
    const rightBefore = this.right;

    this.node = this.left.node;
    this.elements = this.left.elements;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.node = nodeBefore;
    this.right.elements = elementsBefore;
    this.right.getDepthFromChildren();
    this.getDepthFromChildren();
  };

  rotateRR() {
    /* the right side is too long => rotate from the right (NOT rightwards) */
    const nodeBefore = this.node;
    const elementsBefore = this.elements;
    const leftBefore = this.left;

    this.node = this.right.node;
    this.elements = this.right.elements;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.node = nodeBefore;
    this.left.elements = elementsBefore;
    this.left.getDepthFromChildren();
    this.getDepthFromChildren();
  };

  getDepthFromChildren() {
    this.depth = this.node === null ? 0 : 1;
    if (this.left !== null) {
      this.depth = this.left.depth + 1;
    }
    if (this.right !== null && this.depth <= this.right.depth) {
      this.depth = this.right.depth + 1;
    }
  };

  compare(n1, n2) {
    const v1 = n1[this.attr];
    const v2 = n2[this.attr];

    if (v1 === v2) {
      return 0;
    } else if (v1 < v2) {
      return -1;
    }

    return 1;
  };

  add(n)  {
    const factor = this.compare(n, this.node);
    let ret = false;

    if (factor === 0) {
      this.elements.push(n);

      return this;
    }

    if (factor === -1) {
      if (this.left === null) {
        this.left = new AVLTree(n, this.attr);
        ret = true;
      } else {
        ret = this.left.add(n);
        if (ret) {
          this.balance();
        }
      }
    } else if (factor === 1) {
      if (this.right === null) {
        this.right = new AVLTree(n, this.attr);
        ret = true;
      } else {
        ret = this.right.add(n);
        if (ret) {
          this.balance();
        }
      }
    }

    if (ret) {
      this.getDepthFromChildren();
    }

    return this;
  };

  /* Given the beginning of a value, return the elements if there's a match */
  findBest(value) {
    const substr = this.node[this.attr].substr(0, value.length).toLowerCase();
    const data = value.toLowerCase();

    if (data < substr) {
      if (this.left !== null) {
        return this.left.findBest(data);
      }

      return [];
    } else if (data > substr) {
      if (this.right !== null) {
        return this.right.findBest(data);
      }

      return [];
    }

    return this;
  };
}

const avlTree = new AVLTree(2, 2);

avlTree.add(3);
avlTree.add(1);
console.log('AVL Tree elements: ', avlTree.elements);
console.log('Find Best for 2: ', avlTree.findBest(2));
