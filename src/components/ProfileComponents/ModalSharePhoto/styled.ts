import styled, { css, keyframes } from "styled-components";

interface P {
  $paragr: string;
}

export const ContainerModalShare = styled.div`
  
`

interface MainShareProps {
  $isoffdiv: string;
}

export const MainShare = styled.div<MainShareProps>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #00000094;
  z-index: 9999;
  //display: flex;

  display: ${props => props.$isoffdiv === "true" ? "flex" : "none"};
`

export const ContainerClosedModal = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;

  svg {
    color: white;
    font-size: 25px;
    cursor: pointer;
  }
`

interface ContainerContentShareProps{
  $advanceshare: string;
}

export const ContainerContentShare = styled.div<ContainerContentShareProps>`
  width: ${props => props.$advanceshare === "true" && "800px"};

  @media (max-width: 900px) {
    width: 580px;
  } 

  @media (max-width: 650px) {
    width: 540px;
  }
`

export const ContainerPublic = styled.div`
  height: 37rem;
  width: 15rem;
  background-color: white;
`