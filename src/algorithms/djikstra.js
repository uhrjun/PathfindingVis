export function dijkstra(grid, start, end) {
	const newGrid = [];
	grid.forEach((rowItem) => {
		const row = [];
		newGrid.push(rowItem);
		rowItem.forEach((node) => {
			node.isVisited = true;
			row.push(node);
		});
	});
	return newGrid;
}

//Start at node with distance zero
//This verifies we're always starting at the node set as the start node
//As the node with distance 0 is the starting node (isStart just a bool for the css the algo doesnt need it the visualization does )
//Every single node is at a distance of inifinity
//Go through the nodes up,down,left & right of the start node (which is also the current node)
//Give them a distance of 1 from your initial 0 so that makes their distance 0+1
//Repeat for every single node till the next node is finished node
//Pick the shortest available distance value from the finished node to the start node
