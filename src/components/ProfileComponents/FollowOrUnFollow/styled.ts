import styled from 'styled-components';

export const WrapperExit = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;

  svg {
    cursor: pointer;
  }
`

export const WrapperButton = styled.div`
  width: 5rem;
  height: 2rem;
  border: none;
`

interface Button {
  $follow: string;
}

export const Button = styled.button<Button>`
  width: 5rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 500;
  font-size: 14px;
  background-color: ${props => props.$follow === "button-follow" ? '#68bcff' : '#f3f3f3'};
  color: ${props => props.$follow === "button-follow" && "white" };
  font-size: ${props => props.$follow === "button-follow" && "15px" };
  &:hover {
    background-color: #d9d9d9;
    background-color: ${props => props.$follow === "button-follow" ? '#5fa6df' : '#d9d9d9'};
  }
`