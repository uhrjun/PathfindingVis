import { useState, useEffect } from "react";
import Node from "../node/node";

const START_NODE_ROW = 2;
const START_NODE_COL = 2;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 19;

export default function Grid() {
	const [grid, setGrid] = useState([]);
	useEffect(() => {
		getInitialGrid();
	}, []);
	const getInitialGrid = () => {
		const grid = [];
		for (let row = 1; row < 21; row++) {
			const currentRow = [];
			for (let col = 1; col < 21; col++) {
				currentRow.push(createNode(col, row));
			}
			grid.push(currentRow);
		}
		setGrid(grid);
		return grid;
	};
	const createNode = (col, row) => {
		return {
			col,
			row,
			isStart: row === START_NODE_ROW && col === START_NODE_COL,
			isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
			distance: Infinity,
			isVisited: false,
			isWall: false,
			previousNode: null,
		};
	};
	return (
		<>
			<div style={{ backgroundColor: "black" }}>
				{grid.map((row, rowIdx) => {
					return (
						<div key={rowIdx} style={{ display: "flex" }}>
							{row.map((node, nodeIdx) => {
								const { row, col, isFinish, isStart, isWall } = node;
								return (
									<Node
										key={nodeIdx}
										col={col}
										row={row}
										isEnd={isFinish}
										isStart={isStart}
										isWall={isWall}></Node>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
}
