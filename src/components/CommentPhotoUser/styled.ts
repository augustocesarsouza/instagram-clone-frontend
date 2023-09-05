import styled, { css, keyframes } from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  width: 1.5rem;
`

export const ContainerOptionsPosition = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`

export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerSvgExit = styled.div`
  position: absolute;
  right: 32px;
  top: 15px;

  svg {
    cursor: pointer;
    color: white;
    font-size: 20px;

    @media (min-width: 1400px) {
      font-size: 28px;
    }
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
`

export const WrapperVideo = styled.div`
  width: 60%;
  height: 100%;
  position: relative; 
  cursor: pointer;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
`

export const Source = styled.source``

interface WrapperVideoIconProps {
  $pause: string;
}

const slowlyAppearAndSlowlyDisappear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const AppearAndDisappear = css`
  animation: ${slowlyAppearAndSlowlyDisappear} 0.4s ease forwards;
`


export const WrapperVideoIcon = styled.div<WrapperVideoIconProps>`


  ${props => props.$pause === "true" && AppearAndDisappear};

  svg {
    font-size: 50px;
    color: white;
  }
`

export const WrapperSound = styled.div`
  position: absolute;
  bottom: 9px;
  right: 10px;
  cursor: pointer;

  svg {
    font-size: 20px;
    color: white;
    z-index: 10;
  }
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