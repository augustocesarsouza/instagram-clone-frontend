import styled from "styled-components";

export const ContainerBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0000005c;
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
  }
`

export const SvgIconExit = styled.svg`
  position: absolute;
  left: 975px;
  top: 15px;
  width: 35px;
  height: 35px;
`

export const ContainerChoice = styled.div`
  width: 13rem;
  height: 5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4%;
`

export const ButtonChoice = styled.button`
  width: 100%;
  height: 100%;
  padding: 11px;
  border: none;
  cursor: pointer;
  background-color: #8080801f;

  &:hover {
    background-color: #80808038;
  }
`