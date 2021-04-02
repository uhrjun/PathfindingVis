import styled from "styled-components";

export const Row = styled.div`
	display: flex;
`;

export const Button = styled.button`
	color: white;
	background-color: transparent;
	padding: 0.5em 1em;
	font-size: 1.25em;
	border: 3px solid white;
	border-radius: 8px;
	font-weight: 600;
	cursor: pointer;
	outline: none;
	&:hover {
		color: black;
		background-color: white;
	}
	transition: all 0.25s linear;
`;
