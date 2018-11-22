class Node {
  constructor(data)
  {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      /*
      * Find the correct position in the
      * tree and add the node
      */
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    /*
    * If the data is less than the node
    * data move left on the tree
    */
    if (newNode.data < node.data) {
      /* If left is null insert node here */
      if (node.left === null) {
        node.left = newNode;
      } else {
        /* if left is not null recurr until null is found  */
        this.insertNode(node.left, newNode);
      }
    /* Else data move right on the tree */
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);

      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);

      return node;
    } else {
      /* Deleting node with no children */
      if (node.left === null && node.right === null) {
        node = null;

        return node;
      }

      /* Deleting node with one children */
      if (node.left === null) {
        node = node.right;

        return node;
      } else if (node.right === null) {
        node = node.left;

        return node;
      }

      /*
      * Deleting node with two children
      * minumum node of the rigt subtree
      * is stored in aux
      */
      const aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  /* Performs inorder traversal of a tree */
  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  /* Performs preorder traversal of a tree */
  preorder(node) {
    if (node != null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  /* Performs postorder traversal of a tree */
  postorder(node) {
    if (node != null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  /* Helpers*/

  findMinNode(node) {
    /*
    * If left of a node is null
    * then it must be minimum node
    */
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  getRootNode() {
    return this.root;
  }

  search(data) {
    return this.searchNode(this.root, data);
  }

  searchNode(node, data)  {
    if (node === null) {
      return null;
      /* If data is less than node's data move left */
    } else if (data < node.data) {
      return this.searchNode(node.left, data);
      /* If data is greater than node's data move right */
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return node;
    }
  }
}

/* Create an object for the BinarySearchTree */
const BST = new BinarySearchTree();

/* Inserting nodes to the BinarySearchTree */
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

/*
*          15
*         /  \
*        10   25
*       / \   / \
*      7  13 22  27
*     / \    /
*    5   9  17
*/

let root = BST.getRootNode();

/* Prints 5 7 9 10 13 15 17 22 25 27 */
BST.inorder(root);

/* Removing node with no children */
BST.remove(5);

/*
*          15
*         /  \
*        10   25
*       / \   / \
*      7  13 22  27
*       \    /
*        9  17
*/

root = BST.getRootNode();

/* prints 7 9 10 13 15 17 22 25 27 */
BST.inorder(root);

/* Removing node with one children */
BST.remove(7);

/*
*          15
*         /  \
*        10   25
*       / \   / \
*      9  13 22  27
*            /
*           17
*/

root = BST.getRootNode();

/* Prints 9 10 13 15 17 22 25 27 */
BST.inorder(root);

/* Removing node with two children */
BST.remove(15);

/*
*          17
*         /  \
*        10   25
*       / \   / \
*      9  13 22  27
*/

root = BST.getRootNode();
console.log('Inorder traversal');

/* Prints 9 10 13 17 22 25 27 */
BST.inorder(root);

console.log('Postorder traversal');
BST.postorder(root);
console.log('Preorder traversal');
BST.preorder(root);
console.log('Search 25: ', BST.search(25));