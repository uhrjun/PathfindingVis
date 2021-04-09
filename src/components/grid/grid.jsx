import React, { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import Node from "../node/node.jsx";
import {
	astar,
	getNodesInShortestPathOrderAstar,
} from "../../algorithms/astar";
import {
	dijkstra,
	getNodesInShortestPathOrder,
} from "../../algorithms/djikstra";
import Sidebar from "../Sidebar/Sidebar";
import { generateMaze } from "../../utils/makeMaze";

import {
	bidirectionalSearch,
	calculatePath,
} from "../../algorithms/bidirectional";

let startRow = 0;
let startCol = 0;
let endRow = 19;
let endCol = 29;

function initGrid(rowSize, colSize) {
	const grid = [];
	if (rowSize !== undefined && colSize !== undefined) {
		for (let row = 0; row < rowSize; row++) {
			const currRow = [];
			for (let col = 0; col < colSize; col++) {
				currRow.push(initNode(col, row));
			}
			grid.push(currRow);
		}
	} else {
		for (let row = 0; row < 20; row++) {
			const currRow = [];
			for (let col = 0; col < 30; col++) {
				currRow.push(initNode(col, row));
			}
			grid.push(currRow);
		}
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
	const [isPressed, setIsPressed] = useState(false);
	const [isMaze, setIsMaze] = useState(false);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			getGridSize();
		});
		resizeObserver.observe(document.getElementById("grid"));
	}, []);

	function getGridSize() {
		const rowSize = Math.floor(
			document.getElementById("grid").clientHeight / 47
		);
		const colSize = Math.floor(
			document.getElementById("grid").clientWidth / 47
		);
		setGrid(() => initGrid(rowSize, colSize));
	}

	function makeMaze(rowSize, colSize) {
		if (isMaze === true) {
			setIsMaze(false);
			setGrid(initGrid(rowSize, colSize));
		} else {
			const newGrid = generateMaze(grid);
			setIsMaze(true);
			return setGrid([...newGrid]);
		}
	}

	function handleMouseDown(row, col) {
		setIsPressed(true);
		toggleWall(grid, row, col);
	}

	function handleMouseEnter(row, col) {
		if (isPressed) {
			updateStart(grid, row, col, startRow, startCol, endRow, endCol);
			toggleWall(grid, row, col, startRow, startCol, endRow, endCol);
		}
	}

	function handleMouseUp() {
		setIsPressed(false);
	}

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

	function updateStart(grid, row, col) {
		const newGrid = grid.slice();
		const currentNode = newGrid[row][col];
		if (currentNode.isStart) {
			currentNode.isStart = false;
			setGrid([...newGrid]);
		}
	}

	function onNodeClick(col, row, isStart, isEnd, isWall) {
		toggleWall(grid, row, col);
		return {
			row,
			col,
			isStart,
			isEnd,
			isWall,
		};
	}

	const timer = (ms) => new Promise((res) => setTimeout(res, ms));
	async function animateShortestPath(shortestPath, grid) {
		for (var i = 0; i < shortestPath.length; i++) {
			let node = shortestPath[i];
			node.isPathVis = true;
			setGrid([...grid]);
			await timer(5);
		}
	}

	async function animateVisitedNodes(
		visitedNodesInOrder,
		grid,
		shortestPath,
		animateShortestPath
	) {
		if (visitedNodesInOrder !== undefined && visitedNodesInOrder !== null) {
			for (var i in visitedNodesInOrder[0]) {
				const node = visitedNodesInOrder[0][i];
				if (node.isVisited) {
					node.isVisitedVis = true;
				}
				setGrid([...grid]);
				await timer(10);
			}
			animateShortestPath(shortestPath, grid);
		} else {
			window.alert("No viable path found!");
			return;
		}
	}
	function visDjikstra(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
		const shortestPath = getNodesInShortestPathOrder(endNode);
		animateVisitedNodes(
			visitedNodesInOrder,
			grid,
			shortestPath,
			animateShortestPath
		);
	}

	function visAstar(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		const visitedNodesInOrder = astar(grid, startNode, endNode);
		const shortestPath = getNodesInShortestPathOrderAstar(endNode);
		animateVisitedNodes(
			visitedNodesInOrder,
			grid,
			shortestPath,
			animateShortestPath
		);
	}

	/* 	async function animateVisitedNodesBiDir(
		visitedNodesInOrder,
		grid,
		dest_visited
	) {
		if (visitedNodesInOrder !== undefined && visitedNodesInOrder !== null) {
			for (var i in visitedNodesInOrder[0]) {
				const node = visitedNodesInOrder[0][i];
				if (node.isVisited) {
					node.isVisitedVis = true;
				}
				setGrid([...grid]);
				await timer(10);
			}
			animateVisitedNodesBiDir(dest_visited, grid, visitedNodesInOrder);
		} else {
			window.alert("No viable path found!");
			return;
		}
	} */

	function visBiDir(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		const visitedNodesInOrder = bidirectionalSearch(grid, startNode, endNode);
		animateShortestPath(visitedNodesInOrder, grid);
	}

	function clearGrid() {
		setGrid(initGrid());
		setIsPressed(false);
	}

	return (
		<>
			<Sidebar>
				<styled.Button onClick={() => visDjikstra(grid)}>
					DIJKSTRA
				</styled.Button>
				<styled.Button onClick={() => visBiDir(grid)}>
					BI DIRECTIONAL
				</styled.Button>
				<styled.Button onClick={() => visAstar(grid)}>A* SEARCH</styled.Button>
				<styled.Button onClick={() => clearGrid()}>CLEAR</styled.Button>
				<styled.Button>START</styled.Button>
				<styled.Button>END</styled.Button>
				<styled.Button onClick={() => makeMaze(grid)}>MAZE</styled.Button>
			</Sidebar>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div
					id="grid"
					onMouseLeave={() => setIsPressed(false)}
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						border: "3px solid white",
						borderRadius: "10px",
						resize: "both",
						overflow: "hidden",
						minHeight: "25%",
						minWidth: "25%",
						maxWidth: "90%",
						maxHeight: "90%",
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
											isPressed={isPressed}
											onMouseClick={onNodeClick}
											onMouseDown={handleMouseDown}
											onMouseEnter={handleMouseEnter}
											onMouseUp={handleMouseUp}
										/>
									);
								})}
							</styled.Row>
						);
					})}
				</div>
			</div>
		</>
	);
}
