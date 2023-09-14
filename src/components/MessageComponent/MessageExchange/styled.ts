import styled, { css, keyframes } from "styled-components";

interface WrapperPMessageProps {
  $mymessage: string;
}

interface pProps {
  $mymessage: string;
}

export const ContainerMessage = styled.div`
  width: 75%;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: 901px) {
    width: 87%;
  }

  @media (max-width: 750px) {
    width: 86%;
  }
`

export const ContainerMainMessageAndTextarea = styled.div`
  display: flex;
  flex-direction: column;
  height: 50rem;
  max-height: 55rem;
  justify-content: flex-end;

  @media (max-width: 750px) {
    height: 50.5rem;
  }

  @media ((min-width: 751px) and (max-width: 936px)) {
    height: 54.1rem;
  }

  @media (max-height: 931px) {
    height: 54rem;
  }
  
  @media (max-height: 875px) {
    height: 50rem;
  }

`

export const ContainerMainMessage = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar{
    background-color: #f1f1f1;
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb{
    background-color: #afafaf;
    border-radius: 5px;
  }
`

export const WrapperMessage = styled.div`
  display: flex;
  margin: 2px 3px;
  padding: 2px;
`

export const WrapperAllParagraph = styled.div`
  /* width: 29rem; */
  width: 100%;

  padding: 10px 0px;
`

export const WrapperTimeMessage = styled.div`
  display: flex;
  justify-content: center;
`

export const PTime = styled.p`
  font-size: 11px;
  font-family: 'Open Sans', sans-serif;
`

export const WrapperPMessage = styled.div<WrapperPMessageProps>`
  display: flex;
  justify-content: ${props => props.$mymessage === "true" ? 'flex-end' : 'flex-start'};
`

export const WrapperImg = styled.div`
  width: 156px;
  height: 257px;
  cursor: pointer;
  position: relative;
`

export const Svg = styled.div`
  position: absolute;
  left: 9px;
  bottom: 5px;
`

export const ContainerInfoUserFrame = styled.div`
 position: absolute;
 top: 8px;
 left: 7px;
 display: flex;
 align-items: center;
 font-family: 'Poppins';

`

export const WrapperImgUserFrame = styled.div`
  width: 30px;
  height: 30px;
`

export const ImgUserFrame = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const ContainerNameUser = styled.div`
  margin-left: 5px;
`

export const PName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #FFFFFF;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  
`

export const P = styled.p<pProps>`
  color: ${props => props.$mymessage === "true" ? 'white' : 'black'};
  background-color: ${props => props.$mymessage === "true" ? '#2196f3' : '#f5f5f5'};
  border-radius: 20px;
  padding: 7px;
  font-size: 13px;
`

export const ContainerMainText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapperTextarea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.7rem;
  width: 96%;
  margin: 10px 0px;
  border: 1px solid #c5c5c5;
  border-radius: 20px;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 15px;
  resize: none;
  border: none;
  padding: 0px 30px;
  &:focus {
    outline: none;
  }
`

export const WrapperButton = styled.div`
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonSend = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #2196F3;
  font-weight: bold;

  &:hover{
    color: #364079;
  }
`

