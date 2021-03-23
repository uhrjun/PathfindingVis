import { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import Node from "../node/node";
import { dijkstra } from "../../algorithms/djikstra";

const startRow = 1;
const startCol = 1;
const endRow = 10;
const endCol = 10;

function initGrid() {
	const grid = [];
	for (let row = 1; row <= 10; row++) {
		const currentRow = [];
		for (let col = 1; col <= 10; col++) {
			currentRow.push(initNode(col, row));
		}
		grid.push(currentRow);
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
		isWall: false,
		previousNode: null,
	};
};

export default function Grid() {
	const [grid, setGrid] = useState(initGrid());
	function visDjikstra() {
		const start = [startCol][startRow];
		const end = [endCol][endRow];
		setGrid(dijkstra(grid, start, end));
	}

	return (
		<div style={{ backgroundColor: "#181a1b", height: "100vh" }}>
			<button onClick={() => visDjikstra()}>Button</button>
			{grid.map((row, rowIndex) => {
				return (
					<styled.Row key={rowIndex} style={{ display: "flex" }}>
						{row.map((node, nodeIndex) => {
							let { row, col, isEnd, isStart, isWall, isVisited } = node;
							return (
								<Node
									key={nodeIndex}
									col={col}
									row={row}
									isStart={isStart}
									isVisited={isVisited}
									isEnd={isEnd}
									isWall={isWall}></Node>
							);
						})}
					</styled.Row>
				);
			})}
		</div>
	);
}
