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
  $createstory: string;
}

interface ContainerCreatePostProps {
  $decrease: string;
}

interface ContainerSharedPostProps {
  $createstory: string;
}

export const ContainerContentAdvanced = styled.div<ContainerContentAdvancedProps>`
  /* width: ${props => props.$extende === "true" ? "74.6%" : "51.3%"}; */
  width: ${props => props.$extende === "true" && "71.5%"};
  width: ${props => props.$extende === "false" && "50%"};
  width: ${props => props.$decrease === "true" && "51.3%"};
  width: ${props => props.$createstory === "true" && "49%"};


  height: 3rem;
  background-color: white;
  border-radius: 12px 9px 0px 0px;
  position: absolute;
  top: 4px;
  left: ${props => props.$extende === "true" ? "193px" : "275px"}; //240px true
  left: ${props => props.$createstory === "true" && "276px"};
  transition: width 1s ease;
  transition: ${props => props.$decrease === "true" ? "width 0s ease" : "width 1s ease"};
  z-index: 10;
`

export const ContainerCreatePost = styled.div<ContainerCreatePostProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$decrease === "true" ? "center" : "space-between"};
  padding: ${props => props.$decrease === "true" ? "14px" : "12px"};
  border-bottom: 1px solid #cfcfcf;

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
  width: 33rem;
  height: 37rem;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #cfcfcf;
`

export const BouncingBorder = styled.div<BouncingBorderProps>`
  position: absolute;
  width: 19%;
  height: 17%;
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
  left: 218px;
  top: 250px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 45px;
  }
`;

export const ContainerSharedPost = styled.div<ContainerSharedPostProps>`
  position: absolute;
  left: ${props => props.$createstory === "true" ? "33%" : "24%"};
  top: 61%;
`

export const PShared = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 19px;
`