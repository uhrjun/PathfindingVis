import { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import Node from "../node/node";
import {
	dijkstra,
	getNodesInShortestPathOrder,
} from "../../algorithms/djikstra";

export default function Grid() {
	const [grid, setGrid] = useState([]);

	const startRow = 2;
	const startCol = 2;
	const endRow = 9;
	const endCol = 9;

	useEffect(() => {
		function initGrid() {
			const grid = [];
			for (let row = 1; row < 11; row++) {
				const currentRow = [];
				for (let col = 1; col < 11; col++) {
					currentRow.push(initNode(col, row));
				}
				grid.push(currentRow);
			}
			setGrid(grid);
		}
		initGrid();
	}, [setGrid]);

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

	return (
		<div style={{ backgroundColor: "black", height: "100vh" }}>
			{grid.map((row, rowIndex) => {
				return (
					<styled.Row key={rowIndex} style={{ display: "flex" }}>
						{row.map((node, nodeIndex) => {
							const { row, col, isEnd, isStart, isWall } = node;
							return (
								<Node
									key={nodeIndex}
									col={col}
									row={row}
									isStart={isStart}
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
