const PriorityQueue = require('../../../data-structures/priority-queue/PriorityQueue');

module.exports = function dijkstra(graph, startVertex) {
	const timeStart = Date.now();

	const distances = {};
	const visitedVertices = {};
	const previousVertices = {};
	const queue = new PriorityQueue();

	graph.getAllVertices().forEach((vertex) => {
		distances[vertex.getKey()] = Infinity;
		previousVertices[vertex.getKey()] = null;
	});

	distances[startVertex.getKey()] = 0;

	queue.add(startVertex, distances[startVertex.getKey()]);

	while (!queue.isEmpty()) {
		const currentVertex = queue.poll();

		currentVertex.getNeighbors().forEach((neighbor) => {
			if (!visitedVertices[neighbor.getKey()]) {
				const edge = graph.findEdge(currentVertex, neighbor);

				const existingDistanceToNeighbor = distances[neighbor.getKey()];
				const distanceToNeighborFromCurrent =
					distances[currentVertex.getKey()] + edge.weight;

				if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
					distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

					if (queue.hasValue(neighbor)) {
						queue.changePriority(neighbor, distances[neighbor.getKey()]);
					}

					previousVertices[neighbor.getKey()] = currentVertex;
				}

				if (!queue.hasValue(neighbor)) {
					queue.add(neighbor, distances[neighbor.getKey()]);
				}
			}
		});

		visitedVertices[currentVertex.getKey()] = currentVertex;
	}

	const time = Date.now() - timeStart;

	return {
		time,
		distances,
		previousVertices,
	};
};
