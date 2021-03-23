import * as styled from "./node.styles";

export default function Node({ col, row, isStart, isEnd, isWall, isVisited }) {
	return (
		<styled.Node
			isStart={isStart}
			isEnd={isEnd}
			isWall={isWall}
			isVisited={isVisited}
			onClick={() =>
				console.log({ col, row, isStart, isEnd, isWall, isVisited })
			}>
			{/* 	{col},{row} */}
		</styled.Node>
	);
}
