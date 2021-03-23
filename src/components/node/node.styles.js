import styled from "styled-components";

export const Node = styled.div`
	width: 25px;
	height: 25px;
	border: 2px solid inherit;
	margin: 1px;
	color: white;
	font-size: 14px;
	border-radius: 0px;
	background-color: ${({ isVisited, isStart, isEnd, isWall }) => {
		if (isStart === true) {
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
