import React from "react";
import * as styled from "./node.styles";

export default function Node({
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
	isPressed,
	onMouseClick,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
}) {
	return (
		<styled.Node
			draggable="false"
			col={col}
			row={row}
			isEnd={isEnd}
			isStart={isStart}
			isWall={isWall}
			isPath={isPath}
			isVisited={isVisited}
			isVisitedVis={isVisitedVis}
			distance={distance}
			isPathVis={isPathVis}
			isPressed={isPressed}
			onClick={() => onMouseClick(row, col, isStart, isEnd)}
			onMouseDown={() => onMouseDown(row, col, isStart, isEnd)}
			onMouseEnter={() => onMouseEnter(row, col, isStart, isEnd)}
			onMouseUp={() => onMouseUp(row, col, isStart, isEnd)}></styled.Node>
	);
}
