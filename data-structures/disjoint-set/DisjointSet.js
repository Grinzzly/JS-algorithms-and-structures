class DisjointSet {
  constructor(num) {
    this.numSets = num;

    this.parents = [];
    for (let i of num) {
      this.parents.push(i); // The index of the parent element. An element is a representative if its parent is itself.
    }

    this.ranks = new Array(num).fill(0);  // Always in the range [0, floor(log2(numElems))].
    this.sizes = new Array(num).fill(0); // Positive number if the element is a representative, otherwise zero.

  }

  getNumberOfElements() {
    return this.parents.length;
  };

  /**
   * Returns the number of disjoint sets overall. This number decreases monotonically as time progresses;
   * each call to mergeSets() either decrements the number by one or leaves it unchanged. 0 <= result <= getNumberOfElements().
   */
  getNumberOfSets() {
    return this.numSets;
  };

  /**
   * (Private) Returns the representative element for the set containing the given element. This method is also
   * known as "find" in the literature. Also performs path compression, which alters the internal state to
   * improve the speed of future queries, but has no externally visible effect on the values returned.
   */
  getRepresentative(elemIndex) {
    if (elemIndex < 0 || elemIndex >= this.parents.length) {
      throw "Element index out of bounds";
    }
    /* Follow parent pointers until we reach a representative */
    let parent = this.parents[elemIndex];

    if (parent === elemIndex) {
      return elemIndex;
    }

    while (true) {
      const grandparent = this.parents[parent];

      if (grandparent === parent) {
        return parent;
      }
      this.parents[elemIndex] = grandparent;  // Partial path compression
      elemIndex = parent;
      parent = grandparent;
    }
  }


  /* Returns the size of the set that the given element is a member of. 1 <= result <= getNumberOfElements(). */
  getSizeOfSet(elemIndex) {
    return this.sizes[this.getRepresentative(elemIndex)];
  };


  /* Tests whether the given two elements are members of the same set. Note that the arguments are orderless. */
  areInSameSet(firstIndex, secondIndex) {
    return this.getRepresentative(firstIndex) === this.getRepresentative(secondIndex);
  };

  /**
   * Merges together the sets that the given two elements belong to. This method is also known as "union" in the literature.
   * If the two elements belong to different sets, then the two sets are merged and the method returns true.
   * Otherwise they belong in the same set, nothing is changed and the method returns false. Note that the arguments are orderless.
   */

  mergeSets(firstIndex, secondIndex) {
    /* Get representatives */
    let firstRepr = this.getRepresentative(firstIndex);
    let secondRepr = this.getRepresentative(secondIndex);

    if (firstRepr === secondRepr) {
      return false;
    }

    /* Compare ranks */
    const comparision = this.ranks[firstRepr] - this.ranks[secondRepr];
    if (comparision === 0) {
      /* Increment firstRepr's rank if both nodes have same rank */
      this.ranks[firstRepr]++;
    } else if (comparision < 0) {
      /* Swap to ensure that firstRepr's rank >= secondRepr's rank */
      const tmp = firstRepr;

      firstRepr = secondRepr;
      secondRepr = tmp;
    }

    /* Graft secondRepr's subtree onto node firstRepr */
    this.parents[secondRepr] = firstRepr;
    this.sizes[firstRepr] += this.sizes[secondRepr];
    this.sizes[secondRepr] = 0;
    this.numSets--;

    return true;
  };


  /**
   * For unit tests. This detects many but not all invalid data structures, throwing an exception
   * if a structural invariant is known to be violated. This always returns silently on a valid object.
   */
  checkStructure() {
    let numRepr = 0;

    this.parents.forEach((parent, i) => {
      const rank = this.ranks[i];
      const size = this.sizes[i];
      const isRepr = parent === i;

      if (isRepr) {
        numRepr++;
      }

      const isParentInRange = 0 <= parent && parent < this.parents.length;
      const isReprRelevant = (isRepr || rank < this.ranks[parent]) &&
        (!isRepr && size === 0 || isRepr && size >= (1 << rank));
      const noAssertion = isParentInRange && isReprRelevant && 0 <= rank ;

      if (!noAssertion) {
        throw "Assertion error";
      }
    });

    if (!(0 <= this.numSets && this.numSets === numRepr && this.numSets <= this.parents.length)) {
      throw "Assertion error";
    }
  };
}
