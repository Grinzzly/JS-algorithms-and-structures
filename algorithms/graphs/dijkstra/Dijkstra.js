const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }

    return lowest;
  }, null);
};

/* Finding minimum cost and path to reach Finish */
const dijkstra = (graph) => {
  /* Track lowest cost to reach each node */
  const costs = Object.assign({finish: Infinity}, graph.start);
  /* Track paths */
  const parents = {finish: null};

  for (let child in graph.start) {
    parents[child] = 'start';
  }

  /* Track nodes that have already been processed */
  const processed = [];
  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];

    for (let n in children) {
      let newCost = cost + children[n];

      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }

      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }

    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;

  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }

  optimalPath.reverse();

  const shortestPath = {
    distance: costs.finish,
    path: optimalPath
  };

  return shortestPath;
};

const problem = {
  start: {A: 5, B: 2},
  A: {C: 4, D: 2},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  finish: {}
};

/*
*         start
*         /  \
*       2     5
*     /        \
*    ▼          ▼
*    B ---8---> A
*    |       /  |
*   7     2     4
*   |   /      |
*   ▼ ▼        ▼
*   D <---6--- C
*    \         /
*     1      3
*      \   /
*       ▼ ▼
*      finish
*/

console.log('Shortest path for given graph is: ', dijkstra(problem));

/* start -> A -> D -> finish */
