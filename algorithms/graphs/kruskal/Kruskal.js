const kruskal = (graph) => {
  const edgeQueue = new PriorityQueue();
  /* Minimum Spanning Tree */
  const MST = [];

  /* Add all edges to the Queue: */
  /**
   * TODO: decide how to deal with queue filling
   * Object.keys(graph).forEach(nodeKey => {
   *   Object.keys(graph[nodeKey]).forEach(boundNodeKey => {
   *     const weight = graph[nodeKey][boundNodeKey];
   *
   *     edgeQueue.enqueue([nodeKey, boundNodeKey], weight);
   *   });
   * });
   */

  for (let node in graph) {
    for (let boundNode in graph[node]) {
      const weight = graph[node][boundNode];

      edgeQueue.enqueue([node, boundNode], weight);
    }
  }

  let unionFind = new DisjointSet(Object.keys(graph));

  /* Loop until either we explore all nodes or queue is empty */
  while (!edgeQueue.isEmpty()) {
    const nextEdge = edgeQueue.dequeue();
    const nodes = nextEdge.element;
    const weight = nextEdge.priority;

    if (!unionFind.connected(nodes[0], nodes[1])) {
      MST.push([nodes[0], nodes[1], weight]);
      unionFind.union(nodes[0], nodes[1]);
    }
  }

  return MST;
};

class DisjointSet {
  constructor(elements) {
    this.parent = {};

    elements.forEach(e => (this.parent[e] = e));
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    /* Roots are same so these are already connected. */
    if (rootA === rootB) return;

    if (rootA < rootB) {
      if (this.parent[b] !== b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] !== a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }

    return a;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const qElement = new QElement(element, priority);
    let contain = false;

    /**
     * We put element with the highest priority in lower rank
     * then those with lowest priority in order to put edges
     * with higher weight in lowest priority position
     */
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;

        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }

    return this;
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

/* Everything bellow this line for demo purposes only */

const problem = {
  A: {C: 100, B: 3, D: 4},
  B: {G: 9},
  C: {D: 3},
  D: {E: 8},
  E: {F: 10, G: 50},
};

console.log('Minimum spanning tree for given Graph is: ', kruskal(problem).join(' -> '));
