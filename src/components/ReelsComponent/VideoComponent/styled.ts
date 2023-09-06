import styled, { keyframes } from "styled-components";

interface WrapperSvgProps {
  $svg: string;
  $pause: string;
}

interface ParagraphProps{
  $para: string;
}

export const WrapperMainSvgVideo = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;
  
`

export const WrapperVideo = styled.div`
  width: 446px;
  height: 794px;
  /* cursor: pointer; */
  background: black;
  border-radius: 5px;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`

export const Source = styled.source``

export const ContainerForSvg = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
  right: 0;
  top: 4px;
  display: flex;
  justify-content: flex-end;
`

const enterAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const exitAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(0);
  }
`

export const ContainerClickButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 446px;
  height: 794px;
  cursor: pointer;
`

export const WrapperSvg = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${props => props.$svg === "pause" && "80px"};
  height: ${props => props.$svg === "pause" && "80px"};
  border-radius: ${props => props.$svg === "pause" && "50%"};
  animation: ${props => props.$svg === "pause" && props.$pause === "true" && enterAnimation} 1s ease forwards;
  background: ${props => props.$svg === "pause" && "#00000082"};
  left: ${props => props.$svg === "pause" && "202px"};
  top: ${props => props.$svg === "pause" && "350px"};

  svg {
    color: white;
    font-size: ${props => props.$svg === "pause" && "40px"};
  }
`

export const ContainerForPause = styled.div`
  position: absolute;
  width: 100%;
  height: 95%;
  top: 40px;
  cursor: pointer;
  z-index: 10;
` 

export const ContainerMainInfoUser = styled.div`
  width: 410px;
  height: 86px;
  position: absolute;
  left: 15px;
  bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ContainerImgAndName = styled.div` 
  display: flex;
  align-items: center;
`

export const ContainerImgUser = styled.div`
  width: 30px;
  height: 30px;
  
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const Paragraph = styled.p<ParagraphProps>`
  color: white;
  margin-left: ${props => props.$para === "name" && "10px"};
  font-family: 'Roboto';
`

export const ContainerTitle = styled.div``

export const ContainerStatusVideo = styled.div``