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

export const ContainerMain = styled.div`
  width: 50rem;
  height: 40rem;
  background-color: #00000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SvgIconExit = styled.svg`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 35px;
  height: 35px;
`

export const ContainerChoice = styled.div`
  width: 50%;
  height: 20%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4%;
`

interface ButtonChoiceProps {
  $buttonposition: string;
}

export const ButtonChoice = styled.button<ButtonChoiceProps>`
  width: 100%;
  height: 100%;
  padding: 11px;
  border: none;
  cursor: pointer;
  background-color: #8080801f;
  border-top: ${props => props.$buttonposition !== "1" && "1px solid #0000002b"};

  &:hover {
    background-color: #80808038;
  }
`