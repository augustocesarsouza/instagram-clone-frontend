import styled, { css, keyframes } from "styled-components";

interface P {
  $paragr: string;
}

interface BouncingBorderProps {
  $stopspin: string;
}


const ContainerPublicAnima = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }

  100% {
    transform: scaleX(1);
    transform-origin: left;
  }
`

const ContainerPublicAnimation = css`
  animation: ${ContainerPublicAnima} 0.2s ease forwards;
`

export const ContainerContentAdvanced = styled.div`
  background-color: white;
  border-radius: 12px 9px 0px 0px;
  z-index: 10;
  width: 543px;
  height: 45rem;
  display: flex;
  flex-direction: column;
  
`

export const ContainerCreatePost = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cfcfcf;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  svg {
    cursor: pointer;
  }
`

export const P = styled.p<P>`
  font-family: 'Nunito Sans', sans-serif;
  font-weight:${props => props.$paragr === "p1" ? "600": "0"};
  font-size:${props => props.$paragr === "p2" ? "20px": "15px"};
`

export const buttonGo = styled.button`
  border: none;
  background: none;
  color: #2196F3;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingColors = keyframes`
  0% {
    background: conic-gradient(from 0deg, #f60073, #c600b8, #9f10d3, #fd600c, #fca800, #fcc100);
  }

  100% {
    background: conic-gradient(from 0deg, #fcc100, #fca800, #fd600c, #9f10d3, #c600b8, #f60073);
  }
`

const BouncingBorderAnimationFalse = css`
  animation: ${spin} 0.5s linear infinite, ${LoadingColors} 99999999999s linear infinite;
`

const BouncingBorderAnimationTrue = css`
  animation: ${LoadingColors} 99999999999s linear infinite;
`

export const BallWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #cfcfcf;
`

export const BouncingBorder = styled.div<BouncingBorderProps>`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-image: conic-gradient(from 0deg, red, yellow, green, blue, violet, red) 1;
  ${props => props.$stopspin === "true" ? BouncingBorderAnimationTrue : BouncingBorderAnimationFalse };
`

export const BallCenter = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  /* left: 218px;
  top: 250px; */
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 45px;
  }
`;

export const ContainerSharedPost = styled.div`
  position: absolute;
  left: 33%;
  top: 61%;
`

export const PShared = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
`