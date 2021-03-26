function getAllNodes(grid) {
	const nodes = [];
	for (const row of grid) {
		for (const node of row) {
			if (node.isStart === true) {
				node.distance = 0;
			}
			nodes.push(node);
		}
	}
	nodes.sort((nodea, nodeb) => (nodea.distance > nodeb.distance ? 1 : -1));
	return nodes;
}

/* export function getAllNodes(grid = []) {
	const nodes = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			nodes.push(grid[i][j]);
		}
	}
	return nodes;
}
 */
export function dijkstra(grid, startNode, endNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);

	unvisitedNodes.forEach((node) => {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = node;
		if (closestNode.isWall);
		if (closestNode.distance === Infinity)
			return [visitedNodesInOrder, calculatePath(endNode)];
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		if (closestNode === endNode)
			return [visitedNodesInOrder, calculatePath(endNode)];
		updateUnvisitedNeighbors(closestNode, grid);
	});
	return grid;
}

function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function getNodesInShortestPathOrder(node) {
	const nodesInShortestPathOrder = [];
	let currentNode = node;
	while (currentNode !== null) {
		currentNode.isPath = true;
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}
	console.log(nodesInShortestPathOrder);
	return nodesInShortestPathOrder;
}

function updateUnvisitedNeighbors(node, grid) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previousNode = node;
	}
}

function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	const { col, row } = node;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function calculatePath(endNode) {
	const shortestPathNodes = [];
	let currentNode = endNode;
	while (currentNode !== null) {
		currentNode.isPath = true;
		shortestPathNodes.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}
	return shortestPathNodes;
}
