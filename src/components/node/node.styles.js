import styled from "styled-components";

export const Node = styled.div`
	text-align: center;
	width: 50px;
	height: 50px;
	border: none;
	margin: 5px;
	border-radius: 20%;
	cursor: pointer;
	background-color: ${({ isVisitedVis, isStart, isEnd, isWall, isPathVis }) => {
		if (isWall) return "#2D2D2D";
		if (isStart) return "#41cc67";
		if (isEnd) return "#ed3124";
		if (isPathVis) return "#ebb215";
		if (isVisitedVis) return "#00aaff";
		else return "#CACACA";
	}};
	transition: background-color 50ms linear;
	&:hover {
		transition: transform 50ms ease-in-out;
		transform: scale(0.9);
		opacity: 0.5;
	}
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	user-drag: none;
	-webkit-user-drag: none;
	-khtml-user-drag: none;
	-moz-user-drag: none;
	-o-user-drag: none;
`;
