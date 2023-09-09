import styled, { css, keyframes } from "styled-components";

interface ContainerPublicProps {
  $extende: string;
  $decrease: string;
  $isimg: string;
  $createpost: string;
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

export const ContainerPublic = styled.div<ContainerPublicProps>`
  height: auto;
  width: ${props => props.$extende === "true" ? "320px" : "26rem"};
  background-color: white;
  ${props => props.$extende === "true" ? ContainerPublicAnimation : null};

  
`

export const WrapperDataUser = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`

export const WrapperImgUser = styled.div`
  width: 2rem;
  height: 1.9rem;
`

export const ImgUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export const WrapperUser = styled.div`
  margin-left: 10px;
`

export const NameUserP = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;

`

export const WrapperTextarea = styled.div`

`

export const Textarea = styled.textarea`
  width: 15rem;
  height: 10rem;
  resize: none;
  padding: 5px 10px;
  border: none;
  font-family: Arial;
  font-size: 15px;

  &:focus {
   outline : none;
  }
`

export const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #c3c3c3;
  padding: 5px 30px;
`

export const PCounter = styled.p`
  color: #c5c5c5;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
`