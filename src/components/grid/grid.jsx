import React, { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import Node from "../node/node.jsx";
import {
	dijkstra,
	getNodesInShortestPathOrder,
} from "../../algorithms/djikstra";

const startCol = 1;
const startRow = 1;
const endCol = 19;
const endRow = 19;

function initGrid() {
	const grid = [];
	for (let row = 0; row <= 20; row++) {
		const currRow = [];
		for (let col = 0; col <= 20; col++) {
			currRow.push(initNode(col, row));
		}
		grid.push(currRow);
	}
	return grid;
}

const initNode = (col, row) => {
	return {
		col,
		row,
		isStart: row === startRow && col === startCol,
		isEnd: row === endRow && col === endCol,
		distance: Infinity,
		isVisited: false,
		isVisitedVis: false,
		isWall: false,
		isPath: false,
		isPathVis: false,
		previousNode: null,
	};
};

export default function Grid() {
	const [grid, setGrid] = useState([]);

	const handleSetGrid = (newGrid) => {
		setGrid([...newGrid]);
	};

	useEffect(() => {
		setGrid(() => initGrid());
	}, []);

	/* 	function handleClick({
		col,
		row,
		isStart,
		isEnd,
		distance,
		isVisited,
		isWall,
		isPath,
		previousNode,
	}) {
		isWall = true;
		console.log({
			col,
			row,
			isStart,
			isEnd,
			distance,
			isVisited,
			isWall,
			isPath,
			previousNode,
		});
	} */

	const timer = (ms) => new Promise((res) => setTimeout(res, ms));
	async function animateShortestPath(shortestPath, grid) {
		// We need to wrap the loop into an async function for this to work
		for (var i = 0; i < shortestPath.length; i++) {
			let node = shortestPath[i];
			setTimeout((node.isPathVis = true), 1000);
			setGrid([...grid]);
			await timer(50); // then the created Promise can be awaited
		}
	}

	function animateVisitedNodes(
		visitedNodesInOrder,
		grid,
		shortestPath,
		animateShortestPath
	) {
		for (var i in visitedNodesInOrder[0]) {
			const node = visitedNodesInOrder[0][i];
			setTimeout(() => {
				if (node.isVisited) {
					node.isVisitedVis = true;
					setGrid([...grid]);
				}
			}, 0);
		}
		animateShortestPath(shortestPath, grid);
	}

	function visDjikstra(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
		const shortestPath = getNodesInShortestPathOrder(endNode);
		console.log();
		animateVisitedNodes(
			visitedNodesInOrder,
			grid,
			shortestPath,
			animateShortestPath
		);
		/* animateShortestPath(shortestPath, grid); */
		return grid;
	}

	return (
		<div
			style={{
				backgroundColor: "#181a1b",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
			{/* onClick={() => setGrid([...visDjikstra()])} */}
			<button onClick={() => visDjikstra(grid)}>DIJKSTRA</button>
			{grid.map((row, rowIndex) => {
				return (
					<styled.Row key={rowIndex} style={{ display: "flex" }}>
						{row.map((node, nodeIndex) => {
							const {
								col,
								row,
								isStart,
								isEnd,
								distance,
								isVisited,
								isWall,
								isPath,
								isPathVis,
								isVisitedVis,
								previousNode,
							} = node;
							return (
								<Node
									key={nodeIndex}
									col={col}
									row={row}
									isEnd={isEnd}
									isStart={isStart}
									isWall={isWall}
									isPath={isPath}
									isPathVis={isPathVis}
									isVisited={isVisited}
									distance={distance}
									isVisitedVis={isVisitedVis}
									previousNode={previousNode}
								/>
							);
						})}
					</styled.Row>
				);
			})}
		</div>
	);
}
