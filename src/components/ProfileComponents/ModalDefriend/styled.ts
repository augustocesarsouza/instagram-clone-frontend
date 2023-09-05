import styled from "styled-components";

interface ContainerInfoProps {
  $container: string;
}

interface ButtonProps{
  $button: string;
}

export const ContainerMain = styled.div`
  position: absolute;
  right: 7px;
  top: 67px;
  display: flex;
  flex-direction: column;
  width: 11rem;
  box-shadow: 3px 2px 3px 0px #0000001f;
  background-color: #7f7c7c0d;
  padding: 5px;
`

export const Button = styled.button<ButtonProps>`
  background: none;
  border: none;
  /* background-color: #7f7c7c0d; */
  cursor: pointer;
  padding: 6px;
  display: flex;
  border-radius: 5px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 500;
  font-size: 15px;

  background: ${props => props.$button === "confirm" && "#2374e1"};
  color: ${props => props.$button === "confirm" && "white"};

  background: ${props => props.$button === "cancel" && "#ff4e4e"};
  color: ${props => props.$button === "cancel" && "white"};

  &:hover {
    background-color: ${props => props.$button === "confirm" && "#2374e1d9"};
    background-color: ${props => props.$button === "cancel" && "#ff4e4ee8"};
  }
`

export const ContainerModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  background-color: white;
  width: 30rem;
  height: 9rem;
  border-radius: 10px;
  font-family: 'Nunito Sans', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContainerInfo = styled.div<ContainerInfoProps>`
  border-bottom: ${props => props.$container === "defriend" && "1px solid #0000001a"};
  width: ${props => props.$container === "defriend" && "30rem"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

export const Span = styled.span`
  font-weight: bolder;
`

export const P = styled.p``

export const ContainerButton = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  gap: 10px;
`