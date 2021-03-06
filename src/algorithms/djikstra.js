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

export function dijkstra(grid, startNode, endNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);
	//Dont use a for loop here itll stop after iterating over all nodes
	//Even if you dont find your end node

	while (!!unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		let closestNode = unvisitedNodes.shift();
		if (closestNode.isWall === true) continue;
		if (closestNode.distance === Infinity) return [visitedNodesInOrder];
		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		if (closestNode.isEnd) return [visitedNodesInOrder];
		updateUnvisitedNeighbors(closestNode, grid);
	}
}

function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function getNodesInShortestPathOrder(node) {
	const nodesInShortestPathOrder = [];
	let currentNode = node;
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}
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
