class BloomFilter {
  constructor(size = 100) {
    /**
     * Bloom filter size directly affects the likelihood of false positives.
     * The bigger the size the lower the likelihood of false positives.
     */
    this.size = size;
    this.storage = this.createStore(size);
  }

  insert(item) {
    const hashValues = this.getHashValues(item);

    /* Set each hashValue index to true */
    hashValues.forEach(val => this.storage.setValue(val));

    return this;
  }

  contains(item) {
    const hashValues = this.getHashValues(item);

    for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
      if (!this.storage.getValue(hashValues[hashIndex])) {
        /* Item was definitely not inserted */
        return false;
      }
    }

    /* The item have been inserted. */
    return true;
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   */
  createStore(size) {
    const storage = new Array(size).fill(false);

    const storageInterface = {
      getValue(index) {
        return storage[index];
      },
      setValue(index) {
        storage[index] = true;
      },
    };

    return storageInterface;
  }

  hash1(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
      /* Convert to 32bit integer */
      hash &= hash;
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  hash2(item) {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      /* hash * 33 + c */
      hash = (hash << 5) + hash + char;
    }

    return Math.abs(hash % this.size);
  }

  hash3(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) - hash;
      hash += char;
      /* Convert to 32bit integer */
      hash &= hash;
    }

    return Math.abs(hash % this.size);
  }

  /* Runs all 3 hash functions on the input and returns an array of results */
  getHashValues(item) {
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item),
    ];
  }
}

const bloomFilter = new BloomFilter();

bloomFilter.insert('Tony Stark');
bloomFilter.insert('Steve Rodgers');

console.log('Does Bloom Filter contains Tony Stark: ', bloomFilter.contains('Tony Stark'));
console.log('Does Bloom Filter contains Molly Shmark: ', bloomFilter.contains('Molly Shmark'));
console.log('Hashes for Bruce Banner is: ', bloomFilter.getHashValues('Bruce Banner'));
