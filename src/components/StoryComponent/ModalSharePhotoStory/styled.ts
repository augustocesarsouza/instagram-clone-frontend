import styled from "styled-components";

interface P {
  paragr: string;
}

export const ContainerModalShare = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerClosedModal = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    color: white;
    font-size: 25px;
    cursor: pointer;
  }
`

export const ContainerContentShare = styled.div`
  /* height: 37rem;
  background-color: white;
  border-radius: 10px; */
`

export const ContainerPublic = styled.div`
  height: 37rem;
  width: 15rem;
  background-color: white;
`