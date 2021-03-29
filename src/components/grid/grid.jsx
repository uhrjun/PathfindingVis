import React, { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import Node from "../node/node.jsx";

import {
	dijkstra,
	getNodesInShortestPathOrder,
} from "../../algorithms/djikstra";
import Sidebar from "../Sidebar/Sidebar";

const startCol = 1;
const startRow = 5;
const endCol = 9;
const endRow = 5;

function initGrid() {
	const grid = [];
	for (let row = 0; row <= 10; row++) {
		const currRow = [];
		for (let col = 0; col <= 10; col++) {
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
		cost: {
			F: Infinity,
			G: Infinity,
			H: Infinity,
		},
	};
};

export default function Grid() {
	const [grid, setGrid] = useState([]);

	function handleSetGrid() {
		setGrid([...grid]);
	}

	useEffect(() => {
		setGrid(() => initGrid());
	}, []);

	function toggleWall(grid, row, col) {
		const newGrid = grid.slice();
		const currentNode = newGrid[row][col];
		if (
			!currentNode.isPathVis &&
			!currentNode.isEnd &&
			!currentNode.isStart &&
			!currentNode.isVisitedVis
		) {
			currentNode.isWall = !currentNode.isWall;
			setGrid([...newGrid]);
		}
	}

	function onNodeClick(
		col,
		row,
		isStart,
		isEnd,
		distance,
		isVisited,
		isWall,
		isPath,
		isVisitedVis,
		previousNode,
		isPathVis
	) {
		console.log(isWall);
		toggleWall(grid, row, col);
		return {
			col,
			row,
			isStart,
			isEnd,
			distance,
			isVisited,
			isWall,
			isPath,
			isVisitedVis,
			previousNode,
			isPathVis,
		};
	}

	const timer = (ms) => new Promise((res) => setTimeout(res, ms));
	async function animateShortestPath(shortestPath, grid) {
		for (var i = 0; i < shortestPath.length; i++) {
			let node = shortestPath[i];
			setTimeout((node.isPathVis = true), 1000);
			setGrid([...grid]);
			await timer(50);
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
			}, 5);
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
		<>
			<Sidebar>
				<styled.Button onClick={() => setGrid(() => initGrid())}>
					CLEAR
				</styled.Button>
				<styled.Button onClick={() => visDjikstra(grid)}>
					DIJKSTRA
				</styled.Button>
				<styled.Button onClick={() => visDjikstra(grid)}>A STAR</styled.Button>
				<styled.Button onClick={() => console.log(grid)}>PRINT</styled.Button>
			</Sidebar>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
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
										onNodeClick={onNodeClick}
										updateGrid={handleSetGrid}
									/>
								);
							})}
						</styled.Row>
					);
				})}
			</div>
		</>
	);
}
