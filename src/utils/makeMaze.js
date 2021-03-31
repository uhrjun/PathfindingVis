import generate from "@indutny/maze";
//https://www.npmjs.com/package/@indutny/maze

export function generateMaze(grid) {
	const ROW = grid.length;
	const COL = grid[0].length;
	const maze = generate({ width: COL, height: ROW });

	for (let i = 0; i < ROW; i++) {
		for (let j = 0; j < COL; j++) {
			const { row, col } = grid[i][j];
			if (grid[i][j].isStart || grid[i][j].isFinish) {
				if (row > 0) maze[row - 1][col] = 0;
				if (row < ROW - 1) maze[row + 1][col] = 0;
				if (col > 0) maze[row][col - 1] = 0;
				if (col < COL - 1) maze[row][col + 1] = 0;
			}
		}
	}

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (!grid[i][j].isStart && !grid[i][j].isEnd && maze[i][j] === 1) {
				grid[i][j].isWall = true;
			}
		}
	}

	return grid;
}
