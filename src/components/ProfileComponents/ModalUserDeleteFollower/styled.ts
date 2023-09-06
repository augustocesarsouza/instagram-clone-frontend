import styled from "styled-components";

interface Button {
  $button: string;
}

export const ContainerModalConfirmDelete = styled.div`
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

export const ModalContentConfirmDelete = styled.div`
  background-color: white;
  width: 24rem;
  height: 19rem;
  border-radius: 15px;
  font-family: 'Nunito Sans',sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const ContainerInfoUserDelete = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 19rem;
`

export const WrapperImg = styled.div`
  width: 6rem;
  height: 6rem;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`
 
export const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const P = styled.p``

export const WrapperWarning = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  text-align: center;
`

export const ContainerMainButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 9rem;
`

export const WrapperButtonRemove = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #c1c1c1;
`

export const Button = styled.button<Button>`
  border: none;
  background-color: white;
  cursor: pointer;
  color: ${props => props.$button === "remove" && "red"};
  font-weight: ${props => props.$button === "remove" && 600};
`

export const WrapperButtonCancel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #c1c1c1;
`
