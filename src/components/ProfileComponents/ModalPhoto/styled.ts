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
  $createstory: string;
}

export const MainDeTodasTest = styled.div<MainDeTodasTestProps>`
  position: absolute;
  height: 855px;
  /* width: 480px; //story; */
  /* left: -221px;  //story; */
  left: ${props => props.$extende === "true" ? "0px" :  props.$extende === "true" ? "-516px" : "0px"}; // 516px
  
  width: 1026px; 
  top: 0px; //437px
  transition: left 0.5s ease;
`

export const ContainerSelectImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`

export const ContainerMainAll = styled.div`
  position: relative;
  width: 1022px;
  height: 875px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerSelectedImage = styled.div<ContainerSelectedImageProps>`
  width: 480px;
  height: 750px;
  position: absolute;
  user-select: none;
  left: ${props => props.$createstory === "true" ? "239px" : props.$extende === "true" ? "192px" : "275px"};

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
  right: 316px;
  top: 80px;
  width: 109px;
  display: flex;
  gap: 10px;
  align-items: center;
`

export const ContainerSvg = styled.div<ContainerSvgProps>`
  position: ${props => props.$opentextstory === "false" && "absolute"};
  right: ${props => props.$opentextstory === "false" && "360px"};
  top: ${props => props.$opentextstory === "false" && "80px"};

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
  top: 400px;
  /* left: 508px; */
  /* left: calc(50% - ${props => props.$width / 2}px); //Centraliza horizontalmente */
  left: ${props => props.$positionlcr === "left" && "306px"};
  right: ${props => props.$positionlcr === "right" && "306px"};
  left: ${props => props.$positionlcr === "center" && `calc(50% - ${props.$width / 2}px)`};
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

