import styled from "styled-components";

interface P {
  $paragr: string;
}

interface Button {
  $button: string;
}

export const ContainerModal = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  width: 25rem;
  height: 12rem;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const WrapperP = styled.div`
  margin-top: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const P = styled.p<P>`
  font-family: 'Nunito Sans', sans-serif;
  font-weight:${props => props.$paragr === "p1" ? "600": "0"};
  font-size:${props => props.$paragr === "p2" ? "20px": "15px"};
`

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
`

export const Button = styled.button<Button>`
  border: none;
  background: none;
  width: 25rem;
  padding: 14px;
  border-top: 1px solid #d1d1d1;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  color: ${props => props.$button === "discard" ? "red": "black"};
  font-weight: ${props => props.$button === "discard" ? "600": "0"};
`