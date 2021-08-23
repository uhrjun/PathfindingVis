import styled from "styled-components";

export const Row = styled.div`
  display: flex;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  background-color: transparent;
  font-size: 1em;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  width: 35%;
  height: 5%;
  vertical-align: middle;
  &:hover {
    color: black;
    background-color: white;
  }
  transition: all 0.25s linear;
  &:disabled {
    color: grey;
    opacity: 0.5;
    border-color: black;
  }
`;

export const gridContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 85%;
  max-height: 100%;
`;

export const grid = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 7px;
  resize: both;
  overflow: hidden;
  min-height: 25%;
  min-width: 25%;
  max-width: 95%;
  max-height: 95%;
`;
