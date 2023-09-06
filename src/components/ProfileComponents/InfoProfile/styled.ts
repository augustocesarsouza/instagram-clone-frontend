import styled, { css, keyframes } from 'styled-components';

interface BouncingBorderProps {
  $newstory: string;
}

interface ContainerBorderProps {
  $newstory: string;
}

export const ContainerStoryMain = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;

  @media (max-width: 650px) {
    width: 26%;
  }
`

export const ContainerForNewStoryAndBorderWhite = styled.div`

  width: 10rem;
  height: 10rem;
  max-height: 10rem;

  @media (max-width: 650px) {
    width: 8rem;
    height: 8rem;
  }

  @media (max-width: 575px) {
    width: 7rem;
    height: 7rem;
  }
`

export const ContainerTest = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContainerBorder = styled.div<ContainerBorderProps>`
  background-color: white;
  width: 91%;
  height: 91%;
  border-radius: 50%;
  border: ${props => props.$newstory === "true" ? "none" : "1px solid #00000040"};
  z-index: 5;
  position: absolute;

  @media (max-width: 750px) {
    width: 81%;
  height: 81%;
  }
`

export const WrapperImg = styled.div`
  /* width: 137px;
  height: 137px; */
  width: 85%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;

  @media (max-width: 750px) {
    width: 75%;
    height: 75%;
  }
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`

export const Section = styled.section`
  /* width: 21rem; */
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  flex-direction: column;
  height: 10rem;
  width: 30rem;

  @media (max-width: 838px) {
    width: 27rem;
  }

  @media (max-width: 750px) {
    width: 30rem;
  }

  @media (max-width: 650px) {
    width: 27rem;
  }

  @media (max-width: 575px) {
    width: 15rem;
  }
`

// const BouncingBorderAnimationFalse = css` - fica girando infinito
//   animation: ${spin} 1s linear infinite, ${LoadingColors} 99999999999s linear infinite;
// `

const spin = keyframes`
  0%{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingColors = keyframes`
  0% {
    transform: rotate(0deg);
    border: none;
  }

  30% {
    transform: rotate(100deg);
    border-top: 10px dashed #FFFFFF;
  }

  50% {
    transform: rotate(150deg);
    border-right: 10px dashed #FFFFFF;
  }

  70% {
    transform: rotate(155deg);
    border-right: 10px dashed #FFFFFF;
  }

  100% {
    transform: rotate(360deg);
    border: none;
  }
`

const BouncingBorderAnimationFalse = css`
  animation: ${LoadingColors} 3s ease normal;
  border: none;
`

const BouncingBorderAnimationTrue = css`
  animation: ${LoadingColors} 1s ease normal;
`

export const BouncingBorder = styled.div<BouncingBorderProps>`
  position: absolute;
  /* width: 153px;
  height: 153px; */
  width: 95%;
  height: 95%;
  background: linear-gradient( #f60073, #c600b8, #9f10d3, #fd600c, #fca800, #fcc100);
  border-radius: 50%;
  z-index: 1;
  /* border-image: conic-gradient(from 0deg, red, yellow, green, blue, violet, red) 1; */
  ${props => props.$newstory === "true" ? BouncingBorderAnimationFalse : BouncingBorderAnimationTrue }

  @media (max-width: 750px) {
    width: 85%;
  height: 85%;
  }
`