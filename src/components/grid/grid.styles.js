import styled from "styled-components";

export const Row = styled.div`
	display: flex;
`;
export const Node = styled.div`
	width: 75px;
	height: 75px;
	border: 2px solid inherit;
	margin: 1px;
	color: black;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	font-weight: 600;
	border-radius: 0%;
	background-color: ${({ isVisited, isStart, isEnd, isWall, isPath }) => {
		if (isPath === true) {
			return "#faf7f7";
		} else if (isStart === true) {
			return "#4287f5";
		} else if (isEnd === true) {
			return "#4dd672";
		} else if (isWall === true) {
			return "#eb4034";
		} else if (isVisited === true) {
			return "#fcba03";
		} else {
			return "grey";
		}
	}};
`;
