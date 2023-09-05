import styled, { keyframes } from "styled-components";

interface ParagraphCountProps{
  paragraph: string;
}

interface ContainerAllProps{
  container: string;
}

interface WrapperButtonFollowProps {
  button: string;
}

interface ButtonFollowProps{
  button: string;
}


const containerAnima = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ContainerPerfilUser = styled.div`
  position: absolute;
  background: white;
  width: 20rem;
  height: 19rem;
  left: 41px;
  top: 28px;
  box-shadow: 0px -2px 0px 0px #f5f5f5;
  border-radius: 5px;
  font-family: 'Nunito Sans', sans-serif;
  cursor: auto;
  z-index: 9999;

  animation: ${containerAnima} 0.2s linear forwards;
`;

export const ContainerInfoPerfilUser = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
`

export const ContainerImg = styled.div`
  width: 3rem;
  height: 3rem;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerName = styled.div`
  margin-left: 10px;
`

export const Paragraph = styled.p`
  font-weight: bolder;
`

export const ContainerCount = styled.div`
  display: flex;
  justify-content: space-around;
`

export const ContainerAll = styled.div<ContainerAllProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const ParagraphCount = styled.p<ParagraphCountProps>`
  font-weight:${props => props.paragraph === "number" && "bolder"};
  font-size: ${props => props.paragraph === "string" && "14px"};
`

export const WrapperMainThreeImg = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 21px;
`

export const WrapperImgThree = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
`

export const ImgThree = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const WrapperButtonFollow = styled.div<WrapperButtonFollowProps>`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;

  svg {
    position: absolute;
    left: 118px;
    top: 19px;
    color: white;
    font-size: 13px;
  }
`

export const ButtonFollow = styled.button<ButtonFollowProps>`
  border: none;
  color: ${props => props.button == "follow" ? "#fffafd" : "black"};
  background-color: ${props => props.button == "follow" ? "#22a8ff" : "#efefef"};
  padding: 7px;
  width: 18.8rem;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Nunito Sans', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.button == "follow" ? "#2196F3" : "#dfdfdf"};
  }
`
