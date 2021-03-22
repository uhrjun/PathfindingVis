import styled from "styled-components";

export const Node = styled.div`
	width: 50px;
	height: 50px;
	border: 2px solid inherit;
	margin: 2px;
	color: white;
	font-size: 14px;
	border-radius: 5px;
	background-color: ${(props) => {
		if (props.isStart === true) {
			return "#4287f5";
		} else if (props.isEnd === true) {
			return "#4dd672";
		} else if (props.isWall === true) {
			return "red";
		} else {
			return "#181a1b";
		}
	}};
`;
