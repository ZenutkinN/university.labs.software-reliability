const {
	graph,
	startVertex,
	endVertex,
	startVertexIdx,
	endVertexIdx,
} = require('./src/data-structures/myGraph');

const dijkstra = require('./src/algorithms/graph/dijkstra/dijkstra');
const bellmanFord = require('./src/algorithms/graph/bellman-ford/bellmanFord');
const floydWarshall = require('./src/algorithms/graph/floyd-warshall/floydWarshall');

const NvpMvVoiting = require('./src/algorithms/voting/nvp-mv');

// Asynchronous execution of algorithms
const dijkstraPromise = new Promise((res, rej) => {
	const result = dijkstra(graph, startVertex);
	res(result);
});

// Asynchronous execution of algorithms
const bellmanFordPromise = new Promise((res, rej) => {
	const result = bellmanFord(graph, startVertex);
	res(result);
});

// Asynchronous execution of algorithms
const floydWarshallPromise = new Promise((res, rej) => {
	const result = floydWarshall(graph);
	res(result);
});

Promise.all([dijkstraPromise, bellmanFordPromise, floydWarshallPromise]).then((values) => {
	const [resultDijkstra, resultBellmanFord, resultFloydWarshall] = values;

	console.log({ timeDijkstra: resultDijkstra.time });
	console.log({ timeBellmanFord: resultBellmanFord.time });
	console.log({ timeFloydWarshall: resultFloydWarshall.time });

	const result = NvpMvVoiting(
		[resultDijkstra.time, resultBellmanFord.time, resultFloydWarshall.time],
		0
	);

	console.log({ result: result[0] });
});
