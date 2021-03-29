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
	width: 60px;
	height: 60px;
	border: none;
	margin: 10px;
	border-radius: 25%;
	background-color: ${({ isVisitedVis, isStart, isEnd, isWall, isPathVis }) => {
		if (isWall) {
			return "#ed3124";
		}
		if (isStart) {
			return "#00aaff";
		}
		if (isEnd) {
			return "#41cc67";
		}

		if (isPathVis) {
			return "#ffffff";
		}
		if (isVisitedVis) {
			return "#ebb215";
		} else {
			return "gray";
		}
	}};
	transition: background-color 150ms linear;
	&:hover {
		transition: all 0.05s linear;
		transform: scale(0.85);
		opacity: 0.95;
	}
`;
