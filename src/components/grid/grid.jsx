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
import { bfs } from "../../algorithms/bfirst";
import { dfs } from "../../algorithms/dfirst";

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
	const [updatingStart, setUpdatingStart] = useState(false);
	const [updatingEnd, setUpdatingEnd] = useState(false);

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

	function makeMaze() {
		const newGrid = generateMaze(grid);
		return setGrid([...newGrid]);
	}

	function handleMouseDown(row, col) {
		if (updatingEnd === true || updatingStart === true) {
		} else {
			toggleWall(row, col);
			setIsPressed(true);
		}
	}

	function handleMouseEnter(row, col) {
		if (updatingEnd === false || updatingStart === false) {
			if (isPressed === true) {
				toggleWall(row, col);
			}
		} else {
		}
	}
	function handleMouseUp() {
		setIsPressed(false);
	}

	function toggleWall(row, col) {
		const currentNode = grid[row][col];
		if (
			!currentNode.isPathVis &&
			!currentNode.isEnd &&
			!currentNode.isStart &&
			!currentNode.isVisitedVis
		) {
			currentNode.isWall = !currentNode.isWall;
			setGrid([...grid]);
		}
	}

	function startNodeUpdateEventLoop() {
		setUpdatingStart(true);
	}

	function updateStart(row, col) {
		const currentNode = grid[row][col];
		try {
			let startNode = grid[startRow][startCol];
		} catch (startNode) {
			if (startNode instanceof TypeError) {
			} else {
				startNode.isStart = false;
			}
		}
		startCol = col;
		startRow = row;
		currentNode.isStart = !currentNode.isStart;
		setUpdatingStart(false);
		setGrid([...grid]);
	}

	function endNodeUpdateEventLoop() {
		setUpdatingEnd(true);
	}

	function updateEnd(row, col) {
		const currentNode = grid[row][col];
		try {
			let endNode = grid[endRow][endCol];
		} catch (endNode) {
			if (TypeError) {
			} else {
				endNode.isEnd = false;
				endNode = grid[(row, col)];
			}
		}
		endCol = col;
		endRow = row;
		currentNode.isEnd = !currentNode.isEnd;
		setUpdatingEnd(false);
		setGrid([...grid]);
	}

	function onNodeClick(row, col, isStart, isEnd) {
		if (updatingStart === true) {
			updateStart(row, col);
		}
		if (updatingEnd === true) {
			updateEnd(row, col, isStart, isEnd);
		}
		return {
			row,
			col,
			isStart,
			isEnd,
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

	function visBfs(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		if (startNode !== undefined && endNode !== undefined) {
			const visitedNodesInOrder = bfs(grid, startNode, endNode);
			const shortestPath = getNodesInShortestPathOrderAstar(endNode);
			animateVisitedNodes(
				visitedNodesInOrder,
				grid,
				shortestPath,
				animateShortestPath
			);
		} else {
			window.alert("Check start/end nodes");
		}
	}

	function visDfs(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		if (startNode !== undefined && endNode !== undefined) {
			const visitedNodesInOrder = dfs(grid, startNode, endNode);
			const shortestPath = getNodesInShortestPathOrderAstar(endNode);
			animateVisitedNodes(
				visitedNodesInOrder,
				grid,
				shortestPath,
				animateShortestPath
			);
		} else {
			window.alert("Check start/end nodes");
		}
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

	async function animateVisitedNodesSource(
		source_visited,
		grid,
		sPathNodes,
		animateShortestPath
	) {
		if (source_visited !== undefined && source_visited !== null) {
			for (var i in source_visited[0]) {
				const node = source_visited[0][i];
				if (node.isVisited) {
					node.isVisitedVis = true;
				}
				setGrid([...grid]);
				await timer(10);
			}
			animateShortestPath(sPathNodes, grid);
		} else {
			window.alert("No viable path found!");
			return;
		}
	}

	async function animateVisitedNodesDest(
		dest_visited,
		grid,
		dPathNodes,
		animateShortestPath
	) {
		if (dest_visited !== undefined && dest_visited !== null) {
			for (var i in dest_visited[0]) {
				const node = dest_visited[0][i];
				if (node.isVisited) {
					node.isVisitedVis = true;
				}
				setGrid([...grid]);
				await timer(10);
			}
			animateShortestPath(dPathNodes, grid);
		} else {
			window.alert("No viable path found!");
			return;
		}
	}

	function visBiDir(grid) {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		const [
			source_visited,
			dest_visited,
			sPathNodes,
			dPathNodes,
		] = bidirectionalSearch(grid, startNode, endNode);
		animateVisitedNodesSource(
			source_visited,
			grid,
			sPathNodes,
			animateShortestPath
		);
		animateVisitedNodesDest(
			dest_visited,
			grid,
			dPathNodes,
			animateShortestPath
		);
	}

	function clearGrid() {
		setGrid(initGrid());
		setIsPressed(false);
	}

	return (
		<>
			<Sidebar>
				<styled.Button onClick={() => visDjikstra(grid)}>
					Dijkstra
				</styled.Button>
				<styled.Button onClick={() => visAstar(grid)}>A* Search</styled.Button>
				<styled.Button onClick={() => visBiDir(grid)}>
					Bi Directional
				</styled.Button>
				<styled.Button onClick={() => visBfs(grid)}>
					Breadth First
				</styled.Button>
				<styled.Button onClick={() => visDfs(grid)}>Depth First</styled.Button>
				<hr
					style={{
						width: "100%",
						height: "0px",
						border: "1px solid white",
						backgroundColor: "white",
					}}
				/>
				<styled.Button onClick={() => clearGrid()}>Reset</styled.Button>
				<styled.Button onClick={() => startNodeUpdateEventLoop()}>
					Start
				</styled.Button>
				<styled.Button onClick={() => endNodeUpdateEventLoop()}>
					End
				</styled.Button>
				<styled.Button onClick={() => makeMaze(grid)}>Maze</styled.Button>
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
						width: "95%",
						height: "95%",
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
						maxWidth: "95%",
						maxHeight: "95%",
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
