import styled from "styled-components";

interface P {
  paragr: string;
}

interface WrapperSelectProps {
  changeiconcolor: string;
}

export const ContainerMain = styled.div`
  height: 37rem;
  background-color: white;
  border-radius: 10px;
`

export const ContainerCreatePost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #cfcfcf;
  width: 40rem;

  svg {
    cursor: pointer;
  }
`

export const P = styled.p<P>`
  font-family: 'Nunito Sans', sans-serif;
  font-weight:${props => props.paragr === "p1" ? "600": "0"};
  font-size:${props => props.paragr === "p2" ? "20px": "15px"};
`

export const ContainerSelectImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 94%;
`

export const WrapperSelect = styled.div<WrapperSelectProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10rem;
  flex-direction: column;

  svg {
    width: 60px;
    height: 60px;

    color:${props => props.changeiconcolor === 'true' && '#3ba4f7'};
  }
`

export const WrapperDragPhotos = styled.div``

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  border: none;
  padding: 9px;
  height: 2rem;
  font-family: 'Nunito Sans',sans-serif;
  font-size: 15px;
  background: #45a3ed;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`