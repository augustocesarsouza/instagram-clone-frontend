import styled, { css, keyframes } from "styled-components";

interface WrapperSvgProps {
  $pause: string;
}

interface ContainerSvgProps {
  $opentextstory: string;
}

interface TextareaProps {
  $textvalue: string;
  $colorchosenbackground: string;
  $fontChosen: string;
}

interface ContainerTextareaProps{
  $width: number;
  $positionlcr: string;
}

interface ContainerTextValueProps {
  $fontChosen: string;
  $colorchosenbackground: string;
  $widthtext: number;
  $eixoy: number;
  $eixox: number;
}

interface MainDeTodasTestProps {
  $extende: string;
  $createpost: string;
}

interface ContainerSelectedImageOutroProps {
  $extende: string;
  $createstory: string;
}

export const MainDeTodasTest = styled.div<MainDeTodasTestProps>`
  position: absolute;
  height: 868px;
  /* width: 480px; //story; */
  /* left: -221px;  //story; */
  left: ${props => props.$createpost === "true" ? "0px" : props.$extende === "true" ? "0px" : "0px"};//-516px
  top: 0px; //-437px
  width: 1010px; 
  transition: left 0.5s ease;
`


export const ContainerSelectImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`

export const ContainerSelectedImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000;
  height: 100%;
  width: 100%;
`

export const ContainerSelectedImageOutro = styled.div<ContainerSelectedImageOutroProps>`
  width: 505px; // 480px
  height: 815px; // 750px
  /* height: 848px; */
  user-select: none;
  position: absolute;
  /* left: ${props => props.$extende === "true" ? "192px" : "239px"}; */
  left: ${props => props.$createstory === "true" ? "276px" : props.$extende === "true" ? "192px" : "275px"};
  top: 53px;
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

export const WrapperSvgPauseTrue = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: absolute;
  left: 230px;
  top: 220px;
  font-size: 100px;
  ${props => props.$pause === "true" && AppearAndDisappear}

  svg {
    color: white;
    cursor: pointer; 
    
  }
`

export const WrapperSvgPauseFalse = styled.div<WrapperSvgProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: absolute;
  left: 230px;
  top: 220px;
  font-size: 100px;
  ${props => props.$pause === "false" && AppearAndDisappear}

  svg {
    color: white;
    cursor: pointer; 
    
  }
`

export const ContainerMainSvg = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
  width: 109px;
  display: flex;
  gap: 10px;
  align-items: center;
`

export const ContainerSvg = styled.div<ContainerSvgProps>`
  position: ${props => props.$opentextstory === "false" && "absolute"};
  right: ${props => props.$opentextstory === "false" && "116px"};
  top: ${props => props.$opentextstory === "false" && "15px"};

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
  background: ${props => props.$colorchosenbackground};
  overflow-y: hidden;
  /* width: ${props => props.$textvalue.length == 0 ? "10px" : `${Math.max(50, 7 + props.$textvalue.length * 10)}px`}; */
  width: ${props => props.$textvalue.length <= 5 ? `${Math.max(20, 14 + props.$textvalue.length * 10)}px` : props => props.$textvalue.length <= 10 ? `${Math.max(0, 5 + props.$textvalue.length * 10)}px` : props => props.$textvalue.length <= 14 ? `${Math.max(2, -4 + props.$textvalue.length * 10)}px`: 
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

export const ContainerTextValue = styled.div.attrs<ContainerTextValueProps>(props => ({
  
  style: {
    
    left: `${props.$eixox}px`,
    top: `${props.$eixoy}px`,
  }
}))`
  position: absolute;
  color: black;
  font-family: ${props => props.$fontChosen};
  background: ${props => props.$colorchosenbackground};
  /* width: ${props => props.$widthtext + " px"}; */
  height: 23px;
  font-size: 16px;
  border-radius: 4px;
  padding: 2px 5px;
  
  user-select: none; 
`

export const Pvalue = styled.p``