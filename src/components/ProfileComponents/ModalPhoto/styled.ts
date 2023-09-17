import styled, { keyframes } from "styled-components";


interface TextareaProps {
  $textvalue: string;
  $colorchosen: string;
  $fontChosen: string;
}

interface ContainerTextareaProps{
  $width: number;
  $positionlcr: string;
}

interface ContainerSvgProps {
  $opentextstory: string;
}

interface MainDeTodasTestProps {
  $extende: string;
}

interface ContainerSelectedImageProps {
  $extende: string;
}

export const MainDeTodasTest = styled.div<MainDeTodasTestProps>`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 90%;
  height: calc(0.4999 * 100vw); 
`

interface ContainerMainOfShareAndImgProps{
  $extende: string;
}

export const ContainerMainOfShareAndImg = styled.div<ContainerMainOfShareAndImgProps>`
 
  width: ${props => props.$extende === "true" ? "990px":  "712px"};
  height: 755px;

  @media (max-width: 911px) {
    width: ${props => props.$extende === "true" ? "618px":  "442px"};
    height: 555px;
  }

`

export const MainImgAndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ContainerImgAndLegendShare = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const ContainerMainAll = styled.div`
 position: absolute;
 width: 100%;
 height: 100%;
  
`

export const ContainerSelectedImage = styled.div<ContainerSelectedImageProps>`
  /* width: 542px;
  height: 811px; */
  width: 100%;
  height: 100%;
  
  user-select: none;
  position: relative;


  /* @media (max-width: 900px) {
    width: 260px;
    height: 470px;
  }

  @media (max-width: 700px) {
    width: 200px;
    height: 360px;
  } */
`

export const ImgSelected = styled.img`
  width: 100%;
  height : 100%;
  display: block;
  object-fit: cover;

  -webkit-user-drag: none;
`

export const ContainerMainSvg = styled.div`
  position: absolute;
  right: 40px;
  top: 20px;
  width: 109px;
  display: flex;
  gap: 10px;
  align-items: center;
 
`

export const ContainerSvg = styled.div<ContainerSvgProps>`
  position: ${props => props.$opentextstory === "false" && "absolute"};
  right: ${props => props.$opentextstory === "false" && "86px"};
  top: ${props => props.$opentextstory === "false" && "12px"};

  width: 25px;
  height: 25px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;


  svg{
    color: white;
    cursor: pointer;
    font-size: 20px;
  }
`

export const ContainerImgColor = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const ContainerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const ContainerFontA = styled.div`
  background: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    position: absolute;
    color: black;
  }
`

export const ContainerTextarea = styled.div<ContainerTextareaProps>`
  position: absolute;
  top: 330px;
  /* left: 508px; */
  /* left: calc(50% - ${props => props.$width / 2}px); //Centraliza horizontalmente */
  left: ${props => props.$positionlcr === "left" && "345px"};
  right: ${props => props.$positionlcr === "right" && "345px"};
  left: ${props => props.$positionlcr === "center" && `calc(50% - ${props.$width / 2}px)`};
  height: 23px;
`

export const Textarea = styled.textarea<TextareaProps>`
  resize: none;
  background: none;
  font-family: ${props => props.$fontChosen};
  border: none;
  color: black;
  background: ${props => props.$colorchosen};
  overflow-y: hidden;
  width: ${props => props.$textvalue.length === undefined ? 0 : props.$textvalue.length <= 5 ? `${Math.max(20, 14 + props.$textvalue.length * 10)}px` : props => props.$textvalue.length <= 10 ? `${Math.max(0, 5 + props.$textvalue.length * 10)}px` : props => props.$textvalue.length <= 14 ? `${Math.max(2, -4 + props.$textvalue.length * 10)}px`: 
  props => props.$textvalue.length <= 15 ? `${Math.max(2, -10 + props.$textvalue.length * 10)}px`:
  props => props.$textvalue.length <= 20 ? `${Math.max(2, -12 + props.$textvalue.length * 10)}px` :
  props => props.$textvalue.length <= 25 ? `${Math.max(2, -20 + props.$textvalue.length * 10)}px` : 
  props => props.$textvalue.length <= 30 ? `${Math.max(2, -29 + props.$textvalue.length * 10)}px` :
  props => props.$textvalue.length > 30 && `${Math.max(2, -39 + props.$textvalue.length * 10)}px`};
  font-size: 16px;
  height: 23px;
  border-radius: 4px;
  padding: 2px 5px;
   transition: width 0.1s ease; /*Adiciona uma transição suave */


  &:focus{
    outline: none;
    
  }
`


export const ParaValue = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  
  font-size: 17px;
`


export const ContainerRed = styled.div`
  position: absolute;
  background: white;
  width: 31px;
  height: 31px;
  border-radius: 50%;
`

