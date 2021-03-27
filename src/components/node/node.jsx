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
	onNodeClick,
}) {
	return (
		<styled.Node
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
			onClick={() => {
				isWall = !isWall;
				onNodeClick(
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
					isPathVis
				);
			}}></styled.Node>
	);
}