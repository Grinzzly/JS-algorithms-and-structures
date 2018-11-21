class TrieNode {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  getWord() {
    const output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join('');
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let node = this.root;

    for(let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i === word.length - 1) {
        node.end = true;
      }
    }
  };

  contains(word) {
    let node = this.root;

    for(let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }

    return node.end;
  };

  find(prefix) {
    let node = this.root;
    const output = [];

    for(let i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    this.findAllWords(node, output);

    return output;
  };

  findAllWords(node, arr) {
    if (node.end) {
      arr.unshift(node.getWord());
    }

    for (let child in node.children) {
      this.findAllWords(node.children[child], arr);
    }
  }
}

const trie = new Trie();

trie.insert('hey');
trie.insert('ho');
trie.insert('hero');

console.log(trie.contains('lets_go')); // false
console.log(trie.contains('ho')); // true

console.log(trie.find('he'));  // [ 'hey', 'hero' ]
console.log(trie.find('her')); // [ 'hero' ]
