import styled, { css, keyframes } from "styled-components";

interface WrapperSvgProps {
  $pause: string;
}


export const ContainerMain = styled.div`
  display: flex;
  width: 1.5rem;

  /* svg {
    color: black;
    width: 100%;
    height: 100%;
    cursor: pointer;
  } */
`
export const ModalOverlay = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const TestContainer = styled.div`
  position: relative;
`

export const ContainerSvgX = styled.div`
  svg {
    position: absolute;
    width: 2%;
    height: 3%;
    cursor: pointer;
    right: 20px;
    top: 15px;
    color: white;
  }
`

interface ModalContentProps {
  $isvideo: string;
}


export const ModalContent = styled.div<ModalContentProps>`
  background-color: white;
  border-radius: 5px;
  width: 1394px;
  height: 836px;
  max-width: 90%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 1548px) {
    width: 80%;
    height: ${props => props.$isvideo === "true" ? "calc(0.48 * 100vw)": "calc(.5356 * 95vw)"};
  }

  /* @media (max-width: 1050px){ 
    max-height: 70%;
  }

  @media ((min-width: 751px) and (max-width: 839px)){ 
    max-height: 60%;
  }

  @media (max-width: 750px){ 
    max-height: 50%;
  } */

`

export const ContainerForAdjustIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

export const ContainerMainVideo = styled.div`
  position: relative;
  /* width: 40%;
  height: 100%; */
  width: 527px;
  height: 100%; //880
  z-index: 1;
  
  cursor: pointer;

  @media ((min-width: 840px) and (max-width: 1050px)){ 
    width: 50%;
  }

  @media ( (min-width: 751px) and (max-width: 839px)){ 
    width: 50%;
  }

  @media  (max-width: 751px){ 
    width: 30%;
  }
  

  /* @media (min-width: 1400px) {
    //width: 33%;
    width: 527px;
    height: 880px;
    position: relative;
  }

  @media (min-width: 1300px) and (max-width: 1399px){ 
    // width: 60%; 
    width: 527px;
    height: 880px;
  }

  @media (min-width: 1201px) and (max-width: 1299px){ 
    width: 60%;
  }

  @media (min-width: 1025px) and (max-width: 1200px){ 
    width: 60%;
  }

  @media (min-width: 840px) and (max-width: 1024px){ 
    width: 43%;
  }

  @media (min-width: 735px) and (max-width: 839px){ 
    width: 40%;
  } */
`

export const ContainerVideo = styled.div`
  width: 60%;
  height: 100%;
  position: relative; 
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
`

export const Source = styled.source``

const slowlyAppearAndSlowlyDisappear = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`

const AppearAndDisappear = css`
  animation: ${slowlyAppearAndSlowlyDisappear} 1s ease-in-out forwards;
`

const slowlyAppearAndSlowlyDisappearPauseTrue = keyframes`
  0% {
    opacity: 1;
  }
`

const AppearAndDisappearPauseTrue = css`
  animation: ${slowlyAppearAndSlowlyDisappearPauseTrue} 1s ease-in-out forwards;
`

export const WrapperSvgPauseTrue = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  /* position: absolute;
  left: 146px;
  top: 170px; */
  ${props => props.$pause === "true" && AppearAndDisappearPauseTrue};

  svg {
    color: white;
    font-size: 60px;
  }
`

export const WrapperSvgPauseFalse = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  /* position: absolute;
  left: 146px;
  top: 170px;
   */
  ${props => props.$pause === "false" && AppearAndDisappear}

  svg {
    color: white;
    font-size: 60px;
  }
`

export const WrapperSound = styled.div`
  position: absolute;
  z-index: 9999;
  right: 8px;
  bottom: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    color: white;
    font-size: 20px;
  }
`