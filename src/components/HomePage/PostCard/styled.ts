import styled, { css, keyframes } from "styled-components";

interface WrapperSvgProps {
  pause: string;
}

interface ContainerVideo{
  isimg: string;
}

export const ContainerUserInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;

  position: relative;
`;

export const ContainerImg = styled.div`
  width: 30px;
  height: 30px;

  cursor: pointer;
`;

export const ImgUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserNameP = styled.p`
  font-size: 15px;
  font-weight: 500;
  font-family: 'Nunito Sans', sans-serif;
  margin-bottom: 5px;
  margin-left: 7px;

  cursor: pointer;
`;

export const ContainerName = styled.div`
  cursor: pointer;
`;

export const ContainerImgPost = styled.div`
  width: 25rem;
`;

export const ImgPost = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

`;

export const ContainerMainVideo = styled.div`
  position: relative;
  margin-bottom: 10px;
`

export const ContainerVideo = styled.div<ContainerVideo>`
  width: 468px;
  /* height: 476px; */
  background: ${props => props.isimg === "false" && "black"};
  /* height: ${props => props.isimg === "true" ? "575px" : "450px"}; */
  height: 575px;
  margin-bottom: ${props => props.isimg === "false" && "10px"};
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
  z-index: 1;
  position: absolute;
  left: 210px;
  top: 230px;
  font-size: 75px;
  ${props => props.pause === "true" && AppearAndDisappearPauseTrue}

  svg {
    color: white;
  }
`

export const WrapperSvgPauseFalse = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: absolute;
  left: 210px;
  top: 230px;
  font-size: 75px;
  ${props => props.pause === "false" && AppearAndDisappear}

  svg {
    color: white;
  }
`

export const WrapperSound = styled.div`
  position: absolute;
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