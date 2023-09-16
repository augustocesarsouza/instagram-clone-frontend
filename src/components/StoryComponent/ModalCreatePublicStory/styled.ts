import styled, { css, keyframes } from "styled-components";

interface P {
  $paragr: string;
}

interface WrapperSelectProps {
  $changeiconcolor: string;
}

interface BouncingBorderProps {
  $stopspin: string;
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
  font-weight:${props => props.$paragr === "p1" ? "600": "0"};
  font-size:${props => props.$paragr === "p2" ? "20px": "15px"};
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

    color:${props => props.$changeiconcolor === 'true' && '#3ba4f7'};
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
  ${props => props.$stopspin === "true" ? BouncingBorderAnimationFalse : BouncingBorderAnimationTrue };
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