import { useState, useEffect } from "react";
import * as styled from "./grid.styles";
import { dijkstra } from "../../algorithms/djikstra";

export default function Grid() {
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

	const [grid, setGrid] = useState([]);
	useEffect(() => {
		setGrid(initGrid());
	}, []);

	function visDjikstra() {
		const startNode = grid[startRow][startCol];
		const endNode = grid[endRow][endCol];
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
			<button onClick={() => console.log(grid)}>PRINT</button>
			{grid.map((row, rowIndex) => {
				return (
					<styled.Row key={rowIndex} style={{ display: "flex" }}>
						{row.map((node, nodeIndex) => {
							let {
								row,
								col,
								isEnd,
								isStart,
								isWall,
								isVisited,
								isPath,
								distance,
								previousNode,
							} = node;
							return (
								<styled.Node
									key={nodeIndex}
									col={col}
									row={row}
									isPath={isPath}
									isStart={isStart}
									isVisited={isVisited}
									isEnd={isEnd}
									distance={distance}
									isWall={isWall}
									previousNode={previousNode}
									onClick={() =>
										console.log({
											col,
											row,
											isStart,
											isEnd,
											isWall,
											isVisited,
											isPath,
											distance,
											previousNode,
										})
									}></styled.Node>
							);
						})}
					</styled.Row>
				);
			})}
		</div>
	);
}
