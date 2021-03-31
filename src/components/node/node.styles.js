import styled, { keyframes, css } from "styled-components";

const nodeUpdate = keyframes`
	ftransform: scale(1.1);

`;

const update = keyframes`
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1);
  }
`;

export const Node = styled.div`
	text-align: center;
	width: 50px;
	height: 50px;
	border: none;
	margin: 10px;
	border-radius: 15%;
	cursor: pointer;
	background-color: ${({ isVisitedVis, isStart, isEnd, isWall, isPathVis }) => {
		if (isWall) return "#363636";
		if (isStart) return "#41cc67";
		if (isEnd) return "#ed3124";
		if (isPathVis) return "#ebb215";
		if (isVisitedVis) return "#00aaff";
		else return "#858585";
	}};
	transition: background-color 250ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
	&:hover {
		transition: transform 100ms ease-in-out;
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
