import * as styled from "./node.styles";

export default function Node({
	col,
	row,
	isStart,
	isEnd,
	isWall,
	isVisited,
	isPath,
	distance,
	previousNode,
}) {
	return (
		<styled.Node
			isStart={isStart}
			isEnd={isEnd}
			isWall={isWall}
			isVisited={isVisited}
			isPath={isPath}
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
			}>
			{distance}
		</styled.Node>
	);
}
