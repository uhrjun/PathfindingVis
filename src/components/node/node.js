import * as styled from "./node.styles";

export default function Node({ col, row, isStart, isEnd, isWall }) {
	return (
		<styled.Node isStart={isStart} isEnd={isEnd} isWall={isWall}></styled.Node>
	);
}
