import styled, { css, keyframes } from "styled-components";

interface P {
  $paragr: string;
}

interface BouncingBorderProps {
  $stopspin: string;
}

interface ContainerContentAdvancedProps {
  $extende: string;
  $decrease: string;
  $clickedshare: string;
}

interface ContainerCreatePostProps {
  $decrease: string;
}


const ContainerShareAnimation = keyframes`
  0%{
    transform: scaleX(0);
    transform-origin: left;
  }

  18%{
    transform: scaleX(1);
    transform-origin: left;
  }
`

const Animation = css`
  animation: ${ContainerShareAnimation} 1s ease forwards;
`

export const ContainerContentAdvanced = styled.div<ContainerContentAdvancedProps>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$clickedshare === "true" ? "column" : "none"};
  align-items: center;
  background-color: white;
  border-radius: 12px 9px 0px 0px;
`

export const ContainerCreatePost = styled.div<ContainerCreatePostProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$decrease === "true" ? "center" : "space-between"};
  padding: ${props => props.$decrease === "true" ? "14px" : "12px"};
  border-bottom: 1px solid #cfcfcf;
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
  animation: ${spin} 1s linear infinite, ${LoadingColors} 99999999999s linear infinite;
`

const BouncingBorderAnimationTrue = css`
  animation: ${LoadingColors} 99999999999s linear infinite;
`

export const BallWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 37rem;
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
  width: 91px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
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