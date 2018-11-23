class Graph {
  constructor(verticesNum)
  {
    this.verticesNum = verticesNum;
    this.adjacencyList = new Map();
  }

  addVertex(v) {
    this.adjacencyList.set(v, []);
  }

  addEdge(v, w) {
    this.adjacencyList.get(v).push(w);
    this.adjacencyList.get(w).push(v);
  }

  getGraph() {
    const keys = this.adjacencyList.keys();
    const graph = {};

    for (let i of keys) {
      /**
       * Great the corresponding adjacency list
       * for the vertex
       */
      const values = this.adjacencyList.get(i);
      const adjListOfVertex = [];

      /**
       * Iterate over the adjacency list
       * concatenate the values into a string
       */
      for (let j of values) {
        adjListOfVertex.push(j);
      }

      /* Print the vertex and its adjacency list */
      graph[i]= adjListOfVertex.join(', ');
    }

    return graph;
  }

  /* Breadth First Search from the given startingNode */
  bfs(startingNode) {
    /* Create a visited array */
    const visited = new Array(this.verticesNum).fill(false);
    const searchOutput = [];

    /* Create an object for queue */
    const queue = new Queue();

    /* Add the starting node to the queue */
    visited[startingNode] = true;
    queue.enqueue(startingNode);

    /* Loop until queue is empty */
    while (!queue.isEmpty()) {
      const queueElement = queue.dequeue();

      /* passing the current vertex to callback function */
      searchOutput.push(queueElement);

      /* Get the adjacent list for current vertex */
      const adjListOfVertex = this.adjacencyList.get(queueElement);

      /**
       * Loop through the list and add the element to the
       * queue if it is not processed yet
       */
      for (let i in adjListOfVertex) {
        const adjacency = adjListOfVertex[i];

        if (!visited[adjacency]) {
          visited[adjacency] = true;
          queue.enqueue(adjacency);
        }
      }
    }

    return searchOutput.join(', ');
  }

  /* Depth First Search from the given startingNode */
  dfs(startingNode) {
    /* Create a visited array */
    const visited = new Array(this.verticesNum).fill(false);
    const searchOutput = [];

    this.DFSRec(startingNode, visited, searchOutput);

    return searchOutput.join(', ');
  }

  /**
   * Recursive function which process and explore
   * all the adjacent vertex of the vertex with which it is called
   */
  DFSRec(vertex, visited, output) {
    visited[vertex] = true;
    output.push(vertex);

    const neighbours = this.adjacencyList.get(vertex);

    for (let i in neighbours) {
      const element = neighbours[i];

      if (!visited[element])
        this.DFSRec(element, visited, output);
    }
  }
}

class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(value) {
    this.data.unshift(value);
  }

  dequeue() {
    return this.data.pop();
  }

  isEmpty() {
    return !this.data.length;
  }
}

const graph = new Graph(6);
const vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

/* adding vertices */
for (let i = 0; i < vertices.length; i++) {
  graph.addVertex(vertices[i]);
}

/* Adding edges */
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');

console.log('Graph: ', graph.getGraph());
/**
 * A -> B D E
 * B -> A C
 * C -> B E F
 * D -> A E
 * E -> A D F C
 * F -> E C
 */

console.log('BFS for "A" node: ', graph.bfs('A'));
/* A B D E C F */

console.log('DFS for "A" node: ', graph.dfs('A'));
/* A B C E D F */
