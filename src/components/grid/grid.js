import { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import { dijkstra } from "../../algorithms/djikstra";

const startCol = 1;
const startRow = 1;
const endCol = 4;
const endRow = 4;

function initGrid() {
	const grid = [];
	for (let row = 0; row <= 5; row++) {
		const currRow = [];
		for (let col = 0; col <= 5; col++) {
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
		isWall: false,
		isPath: false,
		previousNode: null,
	};
};

export default function Grid() {
	const [grid, setGrid] = useState([]);
	useEffect(() => {
		setGrid(() => initGrid());
	}, []);

	function visDjikstra() {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
		console.log(dijkstra(grid, startNode, endNode));
		setGrid(dijkstra(grid, startNode, endNode));
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
			<button onClick={() => visDjikstra()}>DIJKSTRA</button>
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
								previousNode,
							} = node;
							return (
								<styled.Node
									key={nodeIndex}
									col={col}
									isEnd={isEnd}
									isStart={isStart}
									isWall={isWall}
									onClick={() =>
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
										})
									}>
									{row},{col}
									<br />
									{distance}
								</styled.Node>
							);
						})}
					</styled.Row>
				);
			})}
			<button onClick={() => console.log(grid)}>PRINT</button>
		</div>
	);
}
