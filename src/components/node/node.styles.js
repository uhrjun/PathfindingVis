import styled, { keyframes, css } from "styled-components";

const nodeUpdate = keyframes`
	ftransform: scale(1.1);

`;

const update = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const Node = styled.div`
	text-align: center;
	width: 75px;
	height: 75px;
	border: 2px solid black;
	margin: 5px;
	color: black;
	font-size: 24px;
	font-weight: 500;
	border-radius: 20%;
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
	&:hover {
		animation: ${update} 1s linear infinite;
	}
`;
