class HashTable {
  constructor(hashTableSize = 32) {
    this.buckets = Array(hashTableSize).fill(null).map(() => []);
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);

    this.keys[key] = keyHash;

    const bucketList = this.buckets[keyHash];
    const node = bucketList.find({ callback: nodeValue => nodeValue.key === key });

    if (!node) {
      bucketList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  delete(key) {
    const keyHash = this.hash(key);

    delete this.keys[key];

    const bucketList = this.buckets[keyHash];
    const node = bucketList.find({ callback: nodeValue => nodeValue.key === key });

    if (node) {
      return bucketList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const bucketList = this.buckets[this.hash(key)];
    const node = bucketList.find({ callback: nodeValue => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
}

const table = new HashTable();

table.hash('a');
table.hash('p');
table.set('a', 'armani');
table.set('p', 'prada');
table.has('p');
table.get('p');
table.getKeys();
table.delete('a');
