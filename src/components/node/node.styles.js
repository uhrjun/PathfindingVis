import styled from "styled-components";

export const Node = styled.div`
	text-align: center;
	width: 50px;
	height: 50px;
	border: 2px solid black;
	margin: 0px;
	color: black;
	font-size: 24px;
	font-weight: 500;
	border-radius: 5%;
	background-color: ${({ isVisitedVis, isStart, isEnd, isWall, isPathVis }) => {
		if (isWall) {
			return "#eb4034";
		}
		if (isStart) {
			return "#4287f5";
		}
		if (isEnd) {
			return "#4dd672";
		}

		if (isPathVis) {
			return "#faf7f7";
		}
		if (isVisitedVis) {
			return "#fcba03";
		} else {
			return "gray";
		}
	}};
	transition: background-color 0.25s ease-in;
`;
