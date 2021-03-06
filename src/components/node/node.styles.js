import styled, { keyframes, css } from "styled-components";

const visitedUpdate = keyframes`
	0%   { 
		transform: scale(0.5);
		background: #fffb00;
		border-radius: 100%
		}
	50%   {
		background: #fffb00;
	}
	75%   { 
		background: #fffb00;
		transform: scale(1);
	}
  100% {
		border-radius: 30%;
		transform: scale(1.05);
		background: #f6fa00;
		}
`;

const pathUpdate = keyframes`
	0%   { 
		transform: scale(0);
		background: #006eff;
		border-radius: 100%;
	}
	50%   { 
		transform: scale(1.15);
		background: #006eff;
	}
  100% { 
		transform: scale(1);
		background: #006eff;
		border-radius: 20%;
		}
`;
export const Node = styled.div`
  text-align: center;
  width: 60px;
  height: 60px;
  border: 5px solid;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;
  background: ${({ isVisitedVis, isStart, isEnd, isWall, isPathVis }) => {
    if (isWall) return "#303030";

    if (isStart) return "#22e03e";
    if (isEnd) return "#ed3124";
    if (isPathVis)
      return css`
        background-size: 200% 200%;
        background: #00aaff;
        animation: ${pathUpdate} 250ms linear;
      `;
    if (isVisitedVis)
      return css`
        background-size: 200% 200%;
        background: #f7ce39;
        animation: ${visitedUpdate} 250ms linear;
      `;
    else return "#adadad";
  }};
  -webkit-transition: background-color, transform 100ms linear;
  -moz-transition: background-color, transform 100ms linear;
  -o-transition: background-color, transform 100ms linear;
  transition: background-color, transform 100ms linear;
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
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;
