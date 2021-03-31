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

let startRow = 0;
let startCol = 0;
let endRow = 11;
let endCol = 24;

/* let startRow = 1;
let startCol = 1;
let endRow = 11;
let endCol = 11; */

function initGrid() {
	const grid = [];
	for (let row = 0; row < 12; row++) {
		const currRow = [];
		for (let col = 0; col < 25; col++) {
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
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		setGrid(() => initGrid());
	}, []);

	function handleMouseDown(row, col, startRow, starCol, endRow, endCol) {
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
			setTimeout((node.isPathVis = true), 1);
			setGrid([...grid]);
			await timer(25);
		}
	}

	function animateVisitedNodes(
		visitedNodesInOrder,
		grid,
		shortestPath,
		animateShortestPath
	) {
		if (visitedNodesInOrder !== undefined && visitedNodesInOrder !== null) {
			for (var i in visitedNodesInOrder[0]) {
				const node = visitedNodesInOrder[0][i];
				setTimeout(() => {
					if (node.isVisited) {
						node.isVisitedVis = true;
						setGrid([...grid]);
					}
				}, 10);
			}
			animateShortestPath(shortestPath, grid);
		} else {
			window.alert("PATH NOT FOUND!");
			return setGrid(initGrid());
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

	function clearGrid() {
		setGrid(initGrid());
		setIsPressed(false);
	}

	return (
		<>
			<Sidebar>
				<styled.Button onClick={() => clearGrid()}>CLEAR</styled.Button>
				<styled.Button>START</styled.Button>
				<styled.Button onClick={() => visDjikstra(grid)}>
					DIJKSTRA
				</styled.Button>
				<styled.Button onClick={() => visAstar(grid)}>A STAR</styled.Button>
				<styled.Button onClick={() => console.log(grid)}>PRINT</styled.Button>
			</Sidebar>
			<div
				onMouseLeave={() => setIsPressed(false)}
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
		</>
	);
}
