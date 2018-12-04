class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }

  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge) {
    /* Try to find and end start vertices. */
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    /* Insert start vertex if it wasn't inserted. */
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    /* Insert end vertex if it wasn't inserted. */
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    /* Check if edge has been already added. */
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    if (this.isDirected) {
      startVertex.addEdge(edge);
    } else {
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  reverse() {
    this.getAllEdges().forEach((edge) => {
      /* Delete straight edge from graph and from vertices. */
      this.deleteEdge(edge);

      edge.reverse();

      /* Add reversed edge back to the graph and its vertices. */
      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    /**
     * Init matrix with infinities meaning that there is no ways of
     * getting from one vertex to another yet.
     */
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];

        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}

class GraphEdge {
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  toString() {
    return this.getKey();
  }
}

class GraphVertex {
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    this.value = value;
    this.edges = new LinkedList();
  }

  addEdge(edge) {
    this.edges.addToHead(edge);

    return this;
  }

  deleteEdge(edge) {
    this.edges.remove(edge);
  }

  getNeighbors() {
    const edges = this.edges.toArray();

    const neighborsConverter = (node) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    };

    /**
     * Return either start or end vertex.
     * For undirected graphs it is possible that current vertex will be the end one.
     */
    return edges.map(neighborsConverter);
  }

  getEdges() {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value);
  }

  getDegree() {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex,
    });

    return !!vertexNode;
  }

  findEdge(vertex) {
    const edgeFinder = (edge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey() {
    return this.value;
  }

  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  addToHead(value) {
    const newNode = { value };

    newNode.next = this.head;
    this.head = newNode;
    this.length++;

    return this;
  }

  removeFromHead() {
    if (!this.length) {
      return undefined;
    }

    const value = this.head.value;

    this.head = this.head.next;
    this.length--;

    return value;
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

  remove(value) {
    if (!this.length) {
      return undefined;
    }

    if (this.head.value === value) {
      return this.removeFromHead();
    }

    let previousNode = this.head;
    let thisNode = previousNode.next;

    while(thisNode) {
      if(thisNode.value === value) {
        break;
      }

      previousNode = thisNode;
      thisNode = thisNode.next;
    }

    if (thisNode === null) {
      return undefined;
    }

    previousNode.next = thisNode.next;
    this.length--;

    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }
}

const graph = new Graph();
const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const edgeAB = new GraphEdge(vertexA, vertexB);

graph.addEdge(edgeAB);
console.log('All Graph vertices: ', graph.getAllVertices());

const directedGraph = new Graph(true);

directedGraph.addEdge(edgeAB);

const graphVertexA = graph.getVertexByKey(vertexA.getKey());
const graphVertexB = graph.getVertexByKey(vertexB.getKey());

console.log(
  'Get A and B vertices neighbors',
  graphVertexA.getNeighbors(),
  graphVertexB.getNeighbors(),
);
